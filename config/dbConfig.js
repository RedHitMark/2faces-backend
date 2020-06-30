'use strict';

let remoteDbCredential = require('./remoteDbCredential.json');

const url = 'mongodb://' +
    remoteDbCredential.db.username + ':' +
    remoteDbCredential.db.password + '@' +
    remoteDbCredential.db.host + ':' +
    remoteDbCredential.db.port + '/' +
    remoteDbCredential.db.name+ '?authSource=' +
    remoteDbCredential.db.authSource;

const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {url, mongoOptions};
