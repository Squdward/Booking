require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlwares/error");
const cookieParser = require("cookie-parser");

const port = process.env.BACKEND_PORT || 9999;

const app = express();

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ash6bi2.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("DB OK"))
    .catch((err) => console.log("DB ERROR", err));

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    })
);

app.listen(port, () => {
    console.log(`Server start at port ${port}`);
});

app.use("/api", router);
app.use(errorMiddleware);
