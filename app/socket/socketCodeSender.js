const net = require('net');
const cryptoManager = require('../utils/CryptoManager');


const HOSTNAME = process.env.HOSTNAME || "localhost";
const MIN_PORT = process.env.SOCKET_CODE_SENDER || 52000;
const MAX_PORT = process.env.SOCKET_CODE_SENDER1 || 52500;


let socketsCodeSenderPool = new Map();


function requireFreeCodeSenderPort() {
    let port = 0;
    let poolObject;
    let timestamp = Math.floor(new Date().getTime()/1000)
    do {
        port = getRandomInteger(MIN_PORT, MAX_PORT);
        poolObject = socketsCodeSenderPool.get(port);
        console.log(port, poolObject, timestamp);
    } while (poolObject && poolObject.status !== "in_use" &&  (timestamp - poolObject.endTime) < 1000000000);
    socketsCodeSenderPool.set(port, {status:"in_use"})
    return port;
}
function openNewSocketCodeSender(codeSenderPort, code) {
    net.createServer((socketCodeSender) => {
        console.log('CONNECTED_CODE_SENDER: ' + socketCodeSender.remoteAddress +':'+ socketCodeSender.remotePort);

        const stringEscaped = code.toString().replace(/(\r\n|\n|\r|\t)/gm, '');
        const stringEscapedWellTrimmed = stringEscaped.replace(/ +(?= )/g,'');
        console.log(stringEscapedWellTrimmed);

        const key = cryptoManager.sha256(codeSenderPort.toString() + HOSTNAME);
        const iv = cryptoManager.md5(HOSTNAME + codeSenderPort.toString());
        const stringEncrypted = cryptoManager.aes256Encrypt(stringEscapedWellTrimmed, key, iv);

        socketCodeSender.write( stringEncrypted +"\n");
        socketCodeSender.end();

        socketCodeSender.on('close', function() {
            console.log('CLOSED_CODE_SENDER: ' + socketCodeSender.remoteAddress +' '+ socketCodeSender.remotePort);
            socketCodeSender.end();
        });
        socketCodeSender.on('timeout', function() {
            console.log('TIMEOUT_CODE_SENDER: ' + socketCodeSender.remoteAddress +' '+ socketCodeSender.remotePort);
            socketCodeSender.end();
        });
        socketCodeSender.on('error', function() {
            console.log('ERROR_CODE_SENDER: ' + socketCodeSender.remoteAddress +' '+ socketCodeSender.remotePort);
            socketCodeSender.end();
        });
    }).listen(codeSenderPort);
}
function releasePorts(ports) {
    ports.forEach((port) => {
        socketsCodeSenderPool.set(port, {status:"not_used", endTime:Math.floor(new Date().getTime()/1000)})
    });
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

module.exports = {
    requireFreeCodeSenderPort,
    openNewSocketCodeSender,
    releasePorts
};
