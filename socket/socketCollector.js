const net = require('net');
const cryptoManager = require('../utils/CryptoManager');

const HOST = '0.0.0.0'; // parameterize the IP of the Listen

function openNewSocketAndWaitForResult(hostname, collectorPort) {
    return new Promise((resolve,reject) => {
        net.createServer((socketCollector) => {
            console.log('CONNECTED_COLLECTOR: ' + socketCollector.remoteAddress +':'+ socketCollector.remotePort);

            let result = "";

            //'data' - "event handler"
            socketCollector.on('data', function(data) {
                result += data;
            });


            socketCollector.on('timeout', function(data) {
                console.log('TIMEOUT_COLLECTOR: ' + socketCollector.remoteAddress +' '+ socketCollector.remotePort);
                socketCollector.end();
                reject("socket timeout");
            });
            socketCollector.on('error', function(data) {
                console.log('ERROR_COLLECTOR: ' + socketCollector.remoteAddress +' '+ socketCollector.remotePort);
                socketCollector.end();
                reject("socket error");
            });
            socketCollector.on('close', function(data) {
                console.log('CLOSED_COLLECTOR: ' + socketCollector.remoteAddress +' '+ socketCollector.remotePort);
                socketCollector.end();

                if (result && result !== "") {
                    const remotePort = socketCollector.remotePort;

                    const key = cryptoManager.sha256(collectorPort.toString() + hostname.toString());
                    const iv = cryptoManager.md5(hostname.toString() + collectorPort.toString());
                    const message = cryptoManager.aes256Decrypt(result.toString(), key, iv);

                    console.log("Reading from SocketCollector"+collectorPort+":"+remotePort + " -> " +message);
                    resolve(message);
                } else {
                    reject("empty result");
                }

            });
        }).listen(collectorPort, HOST);
    });
}


module.exports = {
    openNewSocketAndWaitForResult
};
