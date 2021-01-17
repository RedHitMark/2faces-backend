const express = require('express');

const apiRouter = express.Router();

const payloadRouter = require('./payloadRouter');
const attackRouter = require('./attackRouter');
const healthRouter = require('./healthcheckRouter');
const deviceRouter = require('./deviceRouter');

/** Healthcheck endpoints **/
apiRouter.use('/healthcheck', healthRouter);

/** Attacks endpoints **/
apiRouter.use('/attacks', attackRouter);

/** Payload endpoints **/
apiRouter.use('/payload', payloadRouter);

/** Devices endpoints **/
apiRouter.use('/devices', deviceRouter);


/** Not found FALL-BACK **/
apiRouter.route("*")
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

module.exports = apiRouter;