require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlwares/error");
const cookieParser = require("cookie-parser");
const path = require('path');
const multer = require("multer");
const port = process.env.BACKEND_PORT || 9999;

const app = express();

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4yvof0g.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("DB OK"))
    .catch((err) => console.log("DB ERROR", err));

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: `http://localhost:${process.env.FRONTEND_PORT}`,
        credentials: true,
    })
);

// Указываем директорию для сохранения загруженных изображений
const uploadDirectory = path.join(__dirname, 'uploads');

// Используем Multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Маршрут для обслуживания изображений
app.get('/uploads/:folder/:imageName', (req, res) => {
    const {imageName, folder} = req.params;
    const imagePath = path.join(uploadDirectory + `/${folder}`, imageName);
    res.sendFile(imagePath);
});

app.listen(port, () => {
    console.log(`Server start at port ${port}`);
});

app.use("/api", router);
app.use(errorMiddleware);
