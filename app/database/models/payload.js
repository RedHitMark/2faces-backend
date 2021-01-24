const payloadModel = require('../mongo').models.payload;

async function create(data) {
    let newPayload = new payloadModel(data);
    return newPayload.save();
}
async function readOneById(payload_id) {
    return payloadModel.findById(payload_id).lean().exec();
}
async function readAll(data) {
    return payloadModel.find(data).lean().exec();
}
async function deleteOne(payload_id) {
    return payloadModel.deleteOne({_id: payload_id}).lean().exec();
}
async function updateOne(payload_id, update_payload) {
    return payloadModel.updateOne({ _id: payload_id }, { $set: update_payload}).lean().exec();
}


module.exports = {
    create,
    readAll,
    readOneById,
    deleteOne,
    updateOne
};
