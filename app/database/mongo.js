const Mongoose = require('mongoose');
let secrets = require('../secrets.json');

const username = process.env.MONGO_USER || secrets.mongodb.user;
const password = process.env.MONGO_PASSWORD || secrets.mongodb.password;
const host = process.env.DOCKER_RUNNING ? "mongo" : secrets.mongodb.host;
const port = process.env.MONGO_PORT || secrets.mongodb.port;
const dbname = process.env.MONGO_DATABASE || secrets.mongodb.dbname;
const authSource = "admin"

const url = 'mongodb://' +
    username + ':' +
    password + '@' +
    host + ':' +
    port + '/' +
    dbname+ '?authSource=' +
    authSource;

const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true };

/**
 * DB Connection
 */
Mongoose.connect(url, mongoOptions);

/**
 * DB Connection error handling
 */
Mongoose.connection.on('error', (err) => {
    if (err) {
        throw err;
    }
});

Mongoose.Promise = global.Promise;

/**
 * Export of DB Connection and collections schemas
 */
module.exports = {
    Mongoose, models: {
        payload: require('./schemas/payload'),
        attackResult: require('./schemas/attackResult')
    }
};
