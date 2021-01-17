const express = require('express');
const payloadRouter = express.Router();

const payloads = require('../database/models/payload');

payloadRouter.get("/", (req, res) => {
    const payload_id = req.query.payload_id;
    if (payload_id) {
        payloads.readOneById(payload_id)
            .then((payload) => {
                if (payload) {
                    res.json(payload);
                } else {
                    res.status(404).json({error: "payload not found"});
                }
            })
            .catch((error) => {
                res.status(error.status).json({error: error.message});
            });
    } else {
        payloads.readAll()
            .then((payloads) => {
                res.json(payloads);
            })
            .catch((error) => {
                res.status(error.status).json({error: error.message});
            });
    }
});

payloadRouter.post("/", (req, res) => {
    payloads.create(req.body)
        .then((payloads) => {
            res.json(payloads);
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

payloadRouter.delete("/", (req, res) => {
    const payload_id = req.query.payload_id;
    payloads.deleteOne(payload_id)
        .then((payloads) => {
            res.json(payloads);
        })
        .catch((error) => {
            res.status(error.status).json({error: error.message});
        });
});

payloadRouter.put("/", (req, res) => {
    const payload_id = req.query.payload_id;
    payloads.updateOne(payload_id, req.body)
        .then((payloads) => {
            res.json(payloads);
        })
        .catch((error) => {
            res.status(error.status).json({error: error.message});
        });
});


module.exports = payloadRouter;
