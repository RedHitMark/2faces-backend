const attackResultModel = require('../mongo').models.attackResult;

async function create(data) {
    let newAttackResult = new attackResultModel(data);
    return newAttackResult.save();
}
async function readOneById(attack_id) {
    return attackResultModel.findById(attack_id).lean().exec();
}
async function readAll(data) {
    return attackResultModel.find(data).lean().exec();
}
async function deleteOne(attack_id) {
    return attackResultModel.deleteOne({_id: attack_id}).lean().exec();
}

module.exports = {
    create,
    readAll,
    readOneById,
    deleteOne,
};
