'use strict';

const attackResultModel = require('../mongo').models.attackResult;

function create(data) {
    let newAttackResult = new attackResultModel(data);
    return newAttackResult.save();
}
function readOneById(attack_id) {
    return attackResultModel.findById(attack_id).lean().exec();
}
function readAll(data) {
    return attackResultModel.find(data).lean().exec();
}
function deleteOne(attack_id) {
    return attackResultModel.deleteOne({_id: attack_id}).lean().exec();
}

module.exports = {
    create,
    readAll,
    readOneById,
    deleteOne,
};
