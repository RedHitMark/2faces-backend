const socketMain = require('./socketMain');
const socketCodeSender = require("./socketCodeSender");
const socketCollector = require("./socketCollector");


function initSocketMain() {
    socketMain.openSocketMain();
}
function getDeviceConnectedToSocketMain() {
    return socketMain.getSocketsMap();
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
async function openNewSocketCodeSender(port, code) {
    socketCodeSender.openNewSocketCodeSender(port, code);
}
async function releaseCodeSenderPorts(ports) {
    socketCodeSender.releasePorts(ports);
}


function requireFreeCollectorPort() {
    return socketCollector.requireFreeCodeCollectorPort();
}
async function openSocketCollectorAndWaitForResult(port) {
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
async function releaseCollectorPort(port) {
    socketCollector.releasePort(port);
}


module.exports = {
    initSocketMain,
    getDeviceConnectedToSocketMain,
    writeOnSocketMainByPort,

    requireFreeCodeSenderPorts,
    openNewSocketCodeSender,
    releaseCodeSenderPorts,

    requireFreeCollectorPort,
    openSocketCollectorAndWaitForResult,
    releaseCollectorPort
};
