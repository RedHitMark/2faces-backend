const socketMain = require('./socketMain');
const socketCodeSender = require("./socketCodeSender");
const socketCollector = require("./socketCollector");

const PORT = process.env.SOCKET_MAIN_PORT || 6969;
const HOSTNAME = "scroking.ddns.net";

function initSocketMain() {
    socketMain.openSocketMain(PORT);
    //set port
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



module.exports = {
    initSocketMain,
    writeOnSocketMainByPort,
    openNewSocketCodeSender,
    socketMain,
    socketCodeSender,
    socketCollector
};
