const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const createError = require('http-errors');
const compression = require('compression');
const helmet = require("helmet");


// Create a new express application
const app = express();


/**
 * Middlewares
 * morgan logger:
 * bodyParser:
 * multer:
 * cors policy config:
 * compression
 * helmet
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.static('public'));



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// web end point
app.get('/', function(req, res){
    res.render('index', {ip_port: "192.168.1.5:"+process.env.SOCKET_MAIN_PORT});
});
app.get('/index', function(req, res){
    res.render('index', {ip_port: "192.168.1.5:"+process.env.SOCKET_MAIN_PORT});
});
app.get('/index.html', function(req, res){
    res.render('index', {ip_port: "192.168.1.5:"+process.env.SOCKET_MAIN_PORT});
});


// Open socketManager
const socketManager = require('./socket/socketManager');
socketManager.initSocketMain();


// Load all api routes
const routes = require('./api/routes')(app, socketManager);


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
