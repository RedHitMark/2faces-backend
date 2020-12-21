'use strict';

let remoteDbCredential = require('./remoteDbCredential.json');

const username = process.env.MONGO_USER || remoteDbCredential.db.username;
const password = process.env.MONGO_PASSWORD || remoteDbCredential.db.password;
const port = 27017;
const host = process.env.DOCKER_RUNNING ? "mongo" : remoteDbCredential.db.host;
const dbname = process.env.MONGO_DATABASE || remoteDbCredential.db.name;
const authSource = "admin"

const url = 'mongodb://' +
    username + ':' +
    password + '@' +
    host + ':' +
    port + '/' +
    dbname+ '?authSource=' +
    authSource;

const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {url, mongoOptions};
