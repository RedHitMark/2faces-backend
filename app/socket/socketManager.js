const socketMain = require('./socketMain');
const socketCodeSender = require("./socketCodeSender");
const socketCollector = require("./socketCollector");


function initSocketMain() {
    socketMain.openSocketMain();
}
function writeOnSocketMainByPort(port, message) {
    socketMain.writeOnSocketByPort(port, message)
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
function openNewSocketCodeSender(port, code) {
    socketCodeSender.openNewSocketCodeSender(port, code);
}
function releaseCodeSenderPorts(ports) {
    socketCodeSender.releasePorts(ports);
}


function requireFreeCollectorPort() {
    return socketCollector.requireFreeCodeCollectorPort();
}
function openSocketCollectorAndWaitForResult(port) {
    return new Promise((resolve,reject) => {
        socketCollector.openSocketCollectorAndWaitForResult(port)
            .then((result)=> {
                resolve(result);
            })
            .catch((error) =>{
                reject(error);
            });
    });
}
function releaseCollectorPort(port) {
    socketCollector.releasePort(port);
}

module.exports = {
    initSocketMain,
    writeOnSocketMainByPort,

    requireFreeCodeSenderPorts,
    openNewSocketCodeSender,
    releaseCodeSenderPorts,

    requireFreeCollectorPort,
    openSocketCollectorAndWaitForResult,
    releaseCollectorPort,

    socketMain,
};
