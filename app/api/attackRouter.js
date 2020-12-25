const express = require('express');
const router = express.Router();

const attacks = require('../database/models/attackResult');

router.get("/", (req, res) => {
    const attack_id = req.query.attack_id;
    if(attack_id) {
        attacks.readOneById(attack_id)
            .then( (attack) => {
                if (attack) {
                    res.json(attack);
                } else {
                    res.status(404).json({error: "payload not found"});
                }
            })
            .catch((error) => {
                res.status(error.status).json({error: error.message});
            });
    } else {
        attacks.readAll()
            .then((attacks) => {
                res.json(attacks);
            }).catch((error) => {
                res.status(error.status).json({error: error.message});
            });
    }
});

router.delete("/", (req, res) => {
    const attack_id = req.query.attack_id;
    attacks.deleteOne(attack_id)
        .then((attack) => {
            res.json(attack);
        })
        .catch((error) => {
            res.status(error.status).json({error: error.message});
        });
});

module.exports = router;
