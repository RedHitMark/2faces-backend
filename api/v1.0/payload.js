var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
    const payload_id = req.query.payload_id;
    if(payload_id) {
        payloads.readOneById(payload_id)
            .then((payload) => {
                if(payload) {
                    res.json(payload);
                } else {
                    res.status(404).json({error: "payload not found"});
                }

            }).catch((error) => {
                res.status(error.status).json({error: error.message});
            });
    } else {
        payloads.readAll()
            .then((payloads) => {
                res.json(payloads);
            }).catch((error) => {
                res.status(error.status).json({error: error.message});
            });
    }
});

router.post("/", (req, res) => {
    payloads.create(req.body)
        .then((payloads) => {
            res.json(payloads);
        }).catch((error) => {
        res.status(500).json({
            error: error
        });
    });
});

router.delete("/", (req, res) => {
    const payload_id = req.query.payload_id;
    payloads.deleteOne(payload_id)
        .then((payloads) => {
            res.json(payloads);
        }).catch((error) => {
            res.status(error.status).json({error: error.message});
        });
});

router.put("/", (req, res) => {
    const payload_id = req.query.payload_id;
    payloads.updateOne(payload_id, req.body)
        .then((payloads) => {
            res.json(payloads);
        }).catch((error) => {
            res.status(error.status).json({error: error.message});
        });
});


module.exports = router;
