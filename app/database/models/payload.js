const payloadModel = require('../mongo').models.payload;

function create(data) {
    let newPayload = new payloadModel(data);
    return newPayload.save();
}
function readOneById(payload_id) {
    return payloadModel.findById(payload_id).lean().exec();
}
function readAll(data) {
    return payloadModel.find(data).lean().exec();
}
function deleteOne(payload_id) {
    return payloadModel.deleteOne({_id: payload_id}).lean().exec();
}
function updateOne(payload_id, update_payload) {
    return payloadModel.updateOne({ _id: payload_id }, { $set: update_payload}).lean().exec();
}


module.exports = {
    create,
    readAll,
    readOneById,
    deleteOne,
    updateOne
};
