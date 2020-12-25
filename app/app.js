/** APP Dependencies **/
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require("helmet");
const path = require('path');
const createError = require('http-errors');


/** Create a new express application **/
const app = express();


/** Middlewares **/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.static('public'));


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// web end point
app.get('/', function(req, res){
    res.render('index', {ip_port: process.env.HOSTNAME+":"+process.env.SOCKET_MAIN_PORT});
});
app.get('/index', function(req, res){
    res.render('index', {ip_port: process.env.HOSTNAME+":"+process.env.SOCKET_MAIN_PORT});
});
app.get('/index.html', function(req, res){
    res.render('index', {ip_port:process.env.HOSTNAME+":"+process.env.SOCKET_MAIN_PORT});
});


/** Open socketManager **/
const socketManager = require('./socket/socketManager');
socketManager.initSocketMain();


/** Load Router **/
const router = require('./api/router');
app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
