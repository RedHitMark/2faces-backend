const socketMain = require('./socketMain');
const socketCodeSender = require("./socketCodeSender");
const socketCollector = require("./socketCollector");

const PORT = process.env.SOCKET_MAIN_PORT || 6969;
const HOSTNAME = "192.168.1.5";

const socketsCodeSenderPool = new Map();

function initSocketMain() {
    socketMain.openSocketMain(PORT);
}

function writeOnSocketMainByPort(port, message) {
    socketMain.writeOnSocketByPort(port, message)
}

function requireFreeCodeSenderPort() {
    let port = 0;
    let poolObject;
    let timestamp = Math.floor(new Date().getTime()/1000)
    do {
        port = getRandomInteger(52000, 52500);
        poolObject = socketsCodeSenderPool.get(port);
        console.log(port, poolObject, timestamp);
    } while (poolObject && poolObject.status !== "in_use" &&  (timestamp - poolObject.endTime) > 1000000000);
    socketsCodeSenderPool.set(port, {status:"in_use"})
    return port;
}
function releasePorts(ports) {
    ports.forEach((port) => {
        socketsCodeSenderPool.set(port, {status:"not_used", endTime:Math.floor(new Date().getTime()/1000)})
    });
}
function openNewSocketCodeSender(port, code) {
    socketCodeSender.openNewSocketCodeSender(HOSTNAME, port, code);
}

function openNewSocketAndWaitForResult(port) {
    return new Promise((resolve,reject) => {
        socketCollector.openNewSocketAndWaitForResult(port)
            .then((result)=> {
                resolve(result);
            })
            .catch((error) =>{
                reject(error);
            });
    });
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}


module.exports = {
    initSocketMain,
    writeOnSocketMainByPort,
    openNewSocketCodeSender,
    openNewSocketAndWaitForResult,
    requireFreeCodeSenderPort,
    releasePorts,
    socketMain,
    socketCodeSender,
    socketCollector
};
