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
function releasePorts(ports) {
    socketCodeSender.releasePorts(ports);
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
