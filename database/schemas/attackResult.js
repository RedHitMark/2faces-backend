'use strict';

const Mongoose = require('mongoose');

/**
 * Attack collection schema
 * @type {Mongoose.Schema}
 */
const AttackResultSchema = new Mongoose.Schema({
    _id: {type: String, required: true, default: () => { return Mongoose.Types.ObjectId()._id}},
    device: {
        ip: {type: String, required: true},
        port: {type: Number, required: true},
        model: {type: String, required: true},
        api: {type: Number, required: true},
        permissions: [{type: String}]
    },
    timestamp: {type: Number, required: true, default: () => { return Math.floor(new Date().getTime()/1000)}},
    payload_id: {type: String, required: true},
    timing: {
        download_time : {type: Number},
        parse_time : {type: Number},
        compile_time : {type: Number},
        dynamic_loading_time : {type: Number},
        execution_time : {type: Number},
    },
    resultType: {type: String, required: true},
    result: {type: String, required: true}
});

/**
 * Model of payload schema
 */
const attackResultModel = Mongoose.model('attackResult', AttackResultSchema);

module.exports = attackResultModel;
