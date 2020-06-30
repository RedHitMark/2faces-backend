const path = require('path');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const createError = require('http-errors');

// Create a new express application
const app = express();

// Middleware - morgan logger config
app.use(logger('dev'));
// Middleware - bodyParser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware - multer config
app.use(multer().array());
// Middleware - cors policy config
app.use(cors());

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
    res.render('index', {ip_port: "scroking.ddns.net:"+process.env.SOCKET_MASTER_PORT});
});
app.get('/index', function(req, res){
    res.render('index', {ip_port: "scroking.ddns.net:"+process.env.SOCKET_MASTER_PORT});
});
app.get('/index.html', function(req, res){
    res.render('index', {ip_port: "scroking.ddns.net:"+process.env.SOCKET_MASTER_PORT});
});

// routes
// Open socketManager
const socketManager = require('./socket/socket');
socketManager.socketMain.openSocketMain();

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
