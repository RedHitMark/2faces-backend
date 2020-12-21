module.exports = (app, socketManager) => {
    const BASE_API_URL = "/api";
    const API_VERSION_1_0 = '/v1.0';

    const payloadRouter = require('./v1.0/payload');
    const attackRouter = require('./v1.0/attack');
    const healthRouter = require('./v1.0/healthcheck');

    const deviceManager = require('./v1.0/deviceManager');

    /** Healthcheck**/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/healthcheck', healthRouter);

    /** Attacks endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/attack', attackRouter);

    /** Payload endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/payload', payloadRouter);


    /** Attacks endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/attack', attackRouter);


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
