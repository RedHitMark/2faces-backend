const Mongoose = require('mongoose');
const config = require('../config/dbConfig');

/**
 * Connessione al DB
 */
Mongoose.connect(config.url, config.mongoOptions);

/**
 * Errore in caso di connessione non avvenuta
 */
Mongoose.connection.on('error', (err) => {
    if (err) {
        throw err;
    }
});

Mongoose.Promise = global.Promise;

/**
 * Export dei componenti necessari per la connessione e utilizzo del DB
 */
module.exports = {
    Mongoose, models: {
        payload: require('./schemas/payload'),
        attackResult: require('./schemas/attackResult')
    }
};
