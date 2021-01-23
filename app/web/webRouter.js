const express = require('express');
const secrets = require('./../secrets.json');


const webRouter = express.Router();


const HOSTNAME = process.env.HOSTNAME || secrets.serverHostName;
const SOCKET_MAIN_PORT = process.env.SOCKET_MAIN_PORT || secrets.socketMainPort;


webRouter.get('/', function(req, res){
    res.render('index', {ip_port: HOSTNAME+":"+SOCKET_MAIN_PORT});
});


module.exports = webRouter;