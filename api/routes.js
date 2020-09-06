module.exports = (app, socketManager) => {
    const BASE_API_URL = "/api";
    const API_VERSION_1_0 = '/v1.0';

    const deviceManager = require('./v1.0/deviceManager');

    const payloads = require('../database/models/payload');
    const attacks = require('../database/models/attackResult');

    /** Devices endpoints **/
    app.route(BASE_API_URL + API_VERSION_1_0 + "/devices")
        .get((req, res) => {
            deviceManager.showAllDevices(socketManager)
                .then((ok) => {
                    res.json(ok);
                }).catch((error) => {
                    res.status(error.status).json({error: error.message});
                });
        })
        .post((req, res) => {
            const device = req.body.device;
            const payload_id = req.body.payload_id;

            deviceManager.triggerDevice(socketManager, device, payload_id)
                .then((ok) => {
                    res.json(ok);
                }).catch((error) => {
                    res.status(error.status).json({error: error.message});
                });
        });


    /** Payload endpoints **/
    app.route(BASE_API_URL + API_VERSION_1_0 + "/payloads")
        .get((req, res) => {
            const payload_id = req.query.payload_id;
            if(payload_id) {
                payloads.readOneById(payload_id)
                    .then((payload) => {
                        if(payload) {
                            res.json(payload);
                        } else {
                            res.status(404).json({error: "payload not found"});
                        }

                    }).catch((error) => {
                        res.status(error.status).json({error: error.message});
                    });
            } else {
                payloads.readAll()
                    .then((payloads) => {
                        res.json(payloads);
                    }).catch((error) => {
                        res.status(error.status).json({error: error.message});
                    });
            }
        })
        .post((req, res) => {
            payloads.create(req.body)
                .then((payloads) => {
                    res.json(payloads);
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                });
        })
        .put((req, res) => {
            const payload_id = req.query.payload_id;
            payloads.updateOne(payload_id, req.body)
                .then((payloads) => {
                    res.json(payloads);
                }).catch((error) => {
                    res.status(error.status).json({error: error.message});
                });
        })
        .delete((req, res) => {
            const payload_id = req.query.payload_id;
            payloads.deleteOne(payload_id)
                .then((payloads) => {
                    res.json(payloads);
                }).catch((error) => {
                    res.status(error.status).json({error: error.message});
                });
        });


    /** Attacks endpoints **/
    app.route(BASE_API_URL + API_VERSION_1_0 + "/attacks")
        .get((req, res) => {
            const attack_id = req.query.attack_id;
            if(attack_id) {
                attacks.readOneById(attack_id)
                    .then( (attack) => {
                        if (attack) {
                            res.json(attack);
                        } else {
                            res.status(404).json({error: "payload not found"});
                        }
                    }).catch((error) => {
                        res.status(error.status).json({error: error.message});
                    });
            } else {
                attacks.readAll()
                    .then((attacks) => {
                        res.json(attacks);
                    }).catch((error) => {
                        res.status(error.status).json({error: error.message});
                    });
            }
        })
        .post( (req, res) => {
            attacks.create(req.body)
                .then( (attacks) => {
                    res.json(attacks);
                }).catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                });
        })
        .delete((req, res) => {
            const attack_id = req.query.attack_id;
            attacks.deleteOne(attack_id)
                .then((attack) => {
                    res.json(attack);
                }).catch((error) => {
                    res.status(error.status).json({error: error.message});
                });
        });


    app.post(BASE_API_URL + API_VERSION_1_0 + "/build-apk", (req, res) => {
        if (req.files && req.files.apk) {
            let apkFile = req.files.apk;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + apkFile.name);

            const spawn = require("child_process").spawn;
            const pythonProcess = spawn('python',["path/to/script.py", "child_process"]);
            pythonProcess.stdout.on('data', (data) => {
                // Do something with the data returned from python script
            });
        }
    });

    /** Not found FALL-BACK **/
    app.route("*")
        .get((req, res) => {
            console.log('GET fall back');
            res.status(404).json({message : "not found on this server"});
        })
        .post((req, res) => {
            console.log('POST fall back');
            res.status(404).json({message : "not found on this server"});
        })
        .delete((req, res) => {
            console.log('DELETE fall back');
            res.status(404).json({message : "not found on this server"});
        })
        .put((req, res) => {
            console.log('PUT fall back');
            res.status(404).json({message : "not found on this server"});
        });
};
