require("dotenv").config();
const express = require("express");
const { initializeServer } = require("./utils/serverInitializer");

const app = express();
const port = process.env.BACKEND_PORT || 9999;

initializeServer(app, port)