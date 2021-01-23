const express = require('express');
const payloads = require('../database/models/payload');


const payloadRouter = express.Router();


payloadRouter
    .get("/", (req, res) => {
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
                    res.status(500).json({error: error});
                });
        } else {
            payloads.readAll()
                .then((payloads) => {
                    res.json(payloads);
                })
                .catch((error) => {
                    res.status(500).json({error: error});
                });
        }
    })
    .post("/", (req, res) => {
        payloads.create(req.body)
            .then((payloads) => {
                res.json(payloads);
            })
            .catch((error) => {
                res.status(500).json({error: error});
            });
    })
    .delete("/", (req, res) => {
        const payload_id = req.query.payload_id;

        if(payload_id) {
            payloads.deleteOne(payload_id)
                .then((payloads) => {
                    res.json(payloads);
                })
                .catch((error) => {
                    res.status(500).json({error: error});
                });
        } else {
            res.status(401).json({error: "Missing payload_id query parameter"});
        }

    })
    .put("/", (req, res) => {
        const payload_id = req.query.payload_id;

        if(payload_id) {
            payloads.updateOne(payload_id, req.body)
                .then((payloads) => {
                    res.json(payloads);
                })
                .catch((error) => {
                    res.status(500).json({error: error});
                });
        } else {
            res.status(401).json({error: "Missing payload_id query parameter"});
        }
    });


module.exports = payloadRouter;
