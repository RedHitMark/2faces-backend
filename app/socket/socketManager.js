const socketMain = require('./socketMain');
const socketCodeSender = require("./socketCodeSender");
const socketCollector = require("./socketCollector");

const PORT = process.env.SOCKET_MAIN_PORT || 6969;
const HOSTNAME = process.env.HOSTNAME || "localhost";

function initSocketMain() {
    socketMain.openSocketMain(PORT);
}

function writeOnSocketMainByPort(port, message) {
    socketMain.writeOnSocketByPort(port, message)
}

function requireFreeCodeSenderPort() {
    return socketCodeSender.requireFreeCodeSenderPort();
}
function releaseCodeSenderPorts(ports) {
    socketCodeSender.releasePorts(ports);
}
function openNewSocketCodeSender(port, code) {
    socketCodeSender.openNewSocketCodeSender(HOSTNAME, port, code);
}

function requireFreeCodeSenderPorts(n) {
    let randomPorts = [];
    let port;
    while (randomPorts.length < n) {
        port = socketCodeSender.requireFreeCodeSenderPort();
        if (port && randomPorts.indexOf(port) === -1) {
            randomPorts.push(port);
        }
    }
    return randomPorts;
}

function releaseCollectorPort(port) {
    socketCollector.releasePort(port);
}
function requireFreeCodeCollectorPort() {
    return socketCollector.requireFreeCodeCollectorPort();
}

function openNewSocketAndWaitForResult(port) {
    return new Promise((resolve,reject) => {
        socketCollector.openNewSocketAndWaitForResult(HOSTNAME, port)
            .then((result)=> {
                resolve(result);
            })
            .catch((error) =>{
                reject(error);
            });
    });
}


module.exports = {
    initSocketMain,
    writeOnSocketMainByPort,

    requireFreeCodeSenderPort,
    requireFreeCodeSenderPorts,
    openNewSocketCodeSender,
    releaseCodeSenderPorts,

    requireFreeCodeCollectorPort,
    openNewSocketAndWaitForResult,
    releaseCollectorPort,

    socketMain,
};
