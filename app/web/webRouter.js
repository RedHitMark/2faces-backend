const express = require('express');

const webRouter = express.Router();

let secrets = require('../secrets.json');
const HOSTNAME = process.env.HOSTNAME | secrets.serverHostName;
const SOCKET_MAIN_PORT = process.env.SOCKET_MAIN_PORT | secrets.socketMainPort;

webRouter.get('/', function(req, res){
    res.render('index', {ip_port: HOSTNAME+":"+SOCKET_MAIN_PORT});
});
webRouter.get('/index', function(req, res){
    res.render('index', {ip_port: HOSTNAME+":"+SOCKET_MAIN_PORT});
});
webRouter.get('/index.html', function(req, res){
    res.render('index', {ip_port: HOSTNAME+":"+SOCKET_MAIN_PORT});
});

module.exports = webRouter;