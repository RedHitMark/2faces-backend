const net = require('net');
const cryptoManager = require("./../CryptoManager");

const HOST = '0.0.0.0'; // parameterize the IP of the Listen
const IP = "scroking.ddns.net"

//store active sockets
const socketsMap = new Map();

function openSocketMain(port) {
    net.createServer(function(socketMain) {
        console.log('CONNECTED_MAIN: ' + socketMain.remoteAddress +':'+ socketMain.remotePort);

        //push socket in socket map
        socketsMap.set(socketMain.remotePort, {socket : socketMain});

        socketMain.on('data', function(data) {
            let dataDecrypt = cryptoManager.aes256Decrypt(
                data.toString(),
                cryptoManager.sha256(port.toString() + IP.toString()),
                cryptoManager.md5(IP.toString() + port.toString())
            );
            console.log("Reading from SocketMain "+socketMain.localPort+":"+socketMain.remotePort + " <- " + dataDecrypt)

            let dataToSend = "";

            if (dataDecrypt === "alive") {
                dataToSend = "Permissions";
            } else if (dataDecrypt.startsWith('Permissions:')) {
                const permissionsString = dataDecrypt.split('Permissions:')[1].toString();

                let obj = socketsMap.get(socketMain.remotePort);
                obj.permissions = permissionsString.split('|');
                obj.permissions = obj.permissions.slice(0, obj.permissions.length -1);
                socketsMap.set(socketMain.remotePort, obj);

                dataToSend = "Permissions granted";
            } else if (dataDecrypt.startsWith('Permissions Granted:')) {
                const permissionsString = dataDecrypt.split('Permissions Granted:')[1].toString();

                let obj = socketsMap.get(socketMain.remotePort);
                obj.permissionsGranted = permissionsString.split('|');
                obj.permissionsGranted = obj.permissionsGranted.slice(0, obj.permissions.length - 1);
                socketsMap.set(socketMain.remotePort, obj);

                dataToSend = "API";
            } else if (dataDecrypt.startsWith('API:')) {
                const apiString = dataDecrypt.split('API:')[1].toString();

                let obj = socketsMap.get(socketMain.remotePort);
                obj.api = apiString;
                socketsMap.set(socketMain.remotePort, obj);

                dataToSend = "Model";
            } else if (dataDecrypt.startsWith('Model:')) {
                const modelString = dataDecrypt.split('Model:')[1].toString();

                let obj = socketsMap.get(socketMain.remotePort);
                obj.model = modelString;
                socketsMap.set(socketMain.remotePort, obj);
            }


            if (dataToSend !== "") {
                writeOnSocketByPort(socketMain.remotePort, dataToSend);
            }
        });


        socketMain.on('error', function() {
            console.log('ERROR_MAIN: ' + socketMain.remoteAddress +' '+ socketMain.remotePort);
            socketsMap.delete(socketMain.remotePort)
        });
        socketMain.on('timeout', function() {
            console.log('TIMEOUT_MAIN: ' + socketMain.remoteAddress +' '+ socketMain.remotePort);
            socketsMap.delete(socketMain.remotePort)
        });
        socketMain.on('close', function(data) {
            console.log('CLOSED_MAIN: ' + socketMain.remoteAddress +' '+ socketMain.remotePort);
            socketsMap.delete(socketMain.remotePort)
        });
    }).listen(port, HOST);
}

function getSocketsMap() {
    return socketsMap;
}

function writeOnSocketByPort(sourcePort, message) {
    if(socketsMap.has(sourcePort)) {
        const localPort = socketsMap.get(sourcePort).socket.localPort;
        const remotePort = socketsMap.get(sourcePort).socket.remotePort;

        console.log("Writing on SocketMain "+localPort+":"+remotePort + " -> " + message)

        const key = cryptoManager.sha256(localPort.toString() + IP.toString());
        const iv = cryptoManager.md5(IP.toString() + localPort.toString())
        const messageEncrypted = cryptoManager.aes256Encrypt(message, key, iv);

        socketsMap.get(sourcePort).socket.write( messageEncrypted + '\n');
    }
}
function readFromSocketMain(socketMain) {

}

module.exports = {
    openSocketMain,
    getSocketsMap,
    writeOnSocketByPort
};
