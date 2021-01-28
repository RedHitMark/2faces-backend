const express = require('express');
const attackModel = require('../database/models/attackResult');


const attackRouter = express.Router();


attackRouter
    .get("/", (req, res) => {
        const attack_id = req.query.attack_id;

        if (attack_id) {
            attackModel.readOneById(attack_id)
                .then((attack) => {
                    if (attack) {
                        res.json(attack);
                    } else {
                        res.status(404).json({error: "attackResult not found"});
                    }
                })
                .catch((error) => {
                    res.status(500).json({error: error});
                });
        } else {
            attackModel.readAll()
                .then((attacks) => {
                    res.json(attacks);
                })
                .catch((error) => {
                    res.status(500).json({error: error});
                });
        }
    })
    .delete("/", (req, res) => {
        const attack_id = req.query.attack_id;

        if(attack_id) {
            attackModel.deleteOne(attack_id)
                .then((attack) => {
                    res.json(attack);
                })
                .catch((error) => {
                    res.status(500).json({error: error});
                });
        } else {
            res.status(401).json({error: "Missing attack_id query parameter"});
        }
    });


module.exports = attackRouter;
