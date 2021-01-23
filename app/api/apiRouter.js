const express = require('express');
const payloadRouter = require('./payloadRouter');
const attackRouter = require('./attackRouter');
const healthRouter = require('./healthcheckRouter');
const deviceRouter = require('./deviceRouter');


const apiRouter = express.Router();


/** Healthcheck endpoints **/
apiRouter.use('/healthcheck', healthRouter);

/** Attacks endpoints **/
apiRouter.use('/attacks', attackRouter);

/** Payload endpoints **/
apiRouter.use('/payload', payloadRouter);

/** Devices endpoints **/
apiRouter.use('/devices', deviceRouter);


module.exports = apiRouter;