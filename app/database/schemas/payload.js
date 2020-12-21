'use strict';

const Mongoose = require('mongoose');

/**
 * Payload collection schema
 * @type {Mongoose.Schema}
 */
const PayloadSchema = new Mongoose.Schema({
    _id: {type: String, required: true, default: () => { return Mongoose.Types.ObjectId()._id}},
    name: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    resultType: {type: String, required: true},
    vulnerabilities : [{type: String}]
});

/**
 * Model of payload schema
 */
const payloadModel = Mongoose.model('payload', PayloadSchema);

module.exports = payloadModel;
