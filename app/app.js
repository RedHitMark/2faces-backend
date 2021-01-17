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
app.use(express.static('web/public'));


/** Web Views **/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'web/views'));


/** Open socketManager **/
const socketManager = require('./socket/socketManager');
socketManager.initSocketMain();


/** Web Router **/
const webRouter = require('./web/webRouter');
app.use('/', webRouter); //TODO remove asap
app.use('/web', webRouter);


/** API Router **/
const apiRouter = require('./api/apiRouter');
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


/*// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/


module.exports = app;
