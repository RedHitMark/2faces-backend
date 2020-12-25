const express = require('express');

const router = express.Router();

const BASE_API_PATH = "/api";

const payloadRouter = require('./payloadRouter');
const attackRouter = require('./attackRouter');
const healthRouter = require('./healthcheckRouter');
const deviceRouter = require('./deviceRouter');

/** Healthcheck endpoints **/
router.use(BASE_API_PATH + '/healthcheck', healthRouter);

/** Attacks endpoints **/
router.use(BASE_API_PATH + '/attacks', attackRouter);

/** Payload endpoints **/
router.use(BASE_API_PATH + '/payload', payloadRouter);

/** Devices endpoints **/
router.use(BASE_API_PATH + '/devices', deviceRouter);


/** Not found FALL-BACK **/
router.route("*")
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


module.exports = router;