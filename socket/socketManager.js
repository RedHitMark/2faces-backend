const socketMain = require('./socketMain');
const socketCodeSender = require("./socketCodeSender");
const socketCollector = require("./socketCollector");

const PORT = process.env.SOCKET_MAIN_PORT || 6969;
const HOSTNAME = "scroking.ddns.net";

function initSocketMain() {
    socketMain.openSocketMain(PORT);
}

function writeOnSocketMainByPort(port, message) {
    socketMain.writeOnSocketByPort(port, message)
}
function writeOnSocketMainByPort(port, message) {
    socketMain.writeOnSocketByPort(port, message)
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
    socketMain,
    socketCodeSender,
    socketCollector
};
