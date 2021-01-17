const express = require('express');

const healthcheckRouter = express.Router();

healthcheckRouter
    .get("/", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });

healthcheckRouter
    .get("/server", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });

healthcheckRouter
    .get("/database", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });

healthcheckRouter
    .get("/socketMain", (req, res) => {
        res.json({
            message : "Server is running fine"
        })
    });

module.exports = healthcheckRouter;