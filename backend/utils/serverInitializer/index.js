const cors = require("cors");
const express = require("express");
const router = require("../../router");
const errorMiddleware = require("../../middlwares/error");
const cookieParser = require("cookie-parser");
const { setupImageRoutes } = require("../imageRoutes");
const Database = require("../database");

async function initializeServer(app, port) {
    await Database.connect();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
            origin: `http://localhost:${process.env.FRONTEND_PORT}`,
            credentials: true,
        })
    );

    setupImageRoutes(app);
    app.use("/api", router);
    app.use(errorMiddleware);

    app.listen(port, () => {
        console.log(`Server start at http://localhost:${port}`);
    });
}

module.exports = { initializeServer };