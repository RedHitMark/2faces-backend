const net = require('net');
const cryptoManager = require('../utils/CryptoUtil');
const secrets = require('../secrets.json');


const HOSTNAME = process.env.HOSTNAME || secrets.serverHostName || "localhost";
const MIN_PORT = process.env.SOCKET_CODE_SENDER || secrets.socketCollectorRange.min || 62000;
const MAX_PORT = process.env.SOCKET_CODE_SENDER1 || secrets.socketCollectorRange.max || 62500;


let socketsCodeCollectorPool = new Map();


function requireFreeCodeCollectorPort() {
    let port = 0;
    let poolObject;
    let timestamp = Math.floor(new Date().getTime()/1000)
    do {
        port = getRandomInteger(MIN_PORT, MAX_PORT);
        poolObject = socketsCodeCollectorPool.get(port);
        console.log(port, poolObject, timestamp);
    } while (poolObject && poolObject.status !== "in_use" &&  (timestamp - poolObject.endTime) < 1000000000);
    socketsCodeCollectorPool.set(port, {status:"in_use"})
    return port;
}
function openSocketCollectorAndWaitForResult(collectorPort) {
    return new Promise((resolve,reject) => {
        net.createServer((socketCollector) => {
            console.log('CONNECTED_COLLECTOR: ' + socketCollector.remoteAddress +':'+ socketCollector.remotePort);

            let result = "";


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

                    const key = cryptoManager.sha256(collectorPort.toString() + HOSTNAME);
                    const iv = cryptoManager.md5(HOSTNAME + collectorPort.toString());
                    const message = cryptoManager.aes256Decrypt(result.toString(), key, iv);

                    console.log("Reading from SocketCollector"+collectorPort+":"+remotePort + " -> " +message);
                    resolve(message);
                } else {
                    reject("empty result");
                }

            });
        }).listen(collectorPort);
    });
}
function releasePort(port) {
    socketsCodeCollectorPool.set(port, {status:"not_used", endTime:Math.floor(new Date().getTime()/1000)});
}


function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}


module.exports = {
    requireFreeCodeCollectorPort,
    openSocketCollectorAndWaitForResult,
    releasePort
};
