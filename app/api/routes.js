module.exports = (app, socketManager) => {
    const BASE_API_URL = "/api";
    const API_VERSION_1_0 = '/v1.0';

    const payloadRouter = require('./routes/payload');
    const attackRouter = require('./routes/attack');
    const healthRouter = require('./routes/healthcheck');
    const deviceRouter = require('./routes/device')(socketManager);

    /** Healthcheck endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/healthcheck', healthRouter);

    /** Attacks endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/attacks', attackRouter);

    /** Payload endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/payload', payloadRouter);

    /** Devices endpoints **/
    app.use(BASE_API_URL + API_VERSION_1_0 + '/devices', deviceRouter);


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
