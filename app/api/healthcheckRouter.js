const express = require('express');


const healthcheckRouter = express.Router();


healthcheckRouter
    .get("/", (req, res) => {
        res.json({
            server : "Server is running fine",
            database : "Database connection is established",
            socketMain : "SocketMain is listening",
        })
    })
    .get("/server", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    })
    .get("/database", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    })
    .get("/socketMain", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });


module.exports = healthcheckRouter;