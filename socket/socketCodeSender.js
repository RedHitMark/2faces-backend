const net = require('net');
const cryptoManager = require('../CryptoManager');

const HOST = '0.0.0.0'; // parameterize the IP of the Listen

function openNewSocketCodeSender(hostname, codeSenderPort, code) {
    net.createServer((socketCodeSender) => {
        console.log('CONNECTED_CODE_SENDER: ' + socketCodeSender.remoteAddress +':'+ socketCodeSender.remotePort);

        writeOnSocketCodeSender(socketCodeSender)
        const stringEscaped = code.toString().replace(/(\r\n|\n|\r|\t)/gm, '');
        const stringEscapedWellTrimmed = stringEscaped.replace(/ +(?= )/g,'');
        console.log(stringEscapedWellTrimmed);

        const key = cryptoManager.sha256(codeSenderPort.toString() + hostname.toString());
        const iv = cryptoManager.md5(hostname.toString() + codeSenderPort.toString());
        const stringEncrypted = cryptoManager.aes256Encrypt(stringEscapedWellTrimmed, key, iv);

        socketCodeSender.write( stringEncrypted +"\n");
        socketCodeSender.end();

        socketCodeSender.on('close', function() {
            console.log('CLOSED_CODE_SENDER: ' + socketCodeSender.remoteAddress +' '+ socketCodeSender.remotePort);
            socketCodeSender.end();
        });
        socketCodeSender.on('timeout', function(data) {
            console.log('TIMEOUT_CODE_SENDER: ' + socketCodeSender.remoteAddress +' '+ socketCodeSender.remotePort);
            socketCodeSender.end();
        });
        socketCodeSender.on('error', function(data) {
            console.log('ERROR_CODE_SENDER: ' + socketCodeSender.remoteAddress +' '+ socketCodeSender.remotePort);
            socketCodeSender.end();
        });
    }).listen(codeSenderPort, HOST);
}

function writeOnSocketCodeSender(socket, ) {

}
module.exports = {
    openNewSocketCodeSender
};
