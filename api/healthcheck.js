const express = require('express');

const router = express.Router();

router
    .get("/", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });

router
    .get("/server", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });

// router.route("/socket-main")
//     .get((req, res) => {
//         res.json({
//             message : "Socket main is listening"
//         })
//     });

module.exports = router;