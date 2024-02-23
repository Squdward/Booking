const path = require("path");
const multer = require("multer");

const uploadDirectory = path.join(__dirname, '../..', "uploads");

// Функция для определения папки назначения для изображений авторов
const authorImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory + "/authors");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Функция для определения папки назначения для обложек книг
const bookCoverStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory + "/books");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Настройка multer для изображений авторов
const uploadAuthorImage = multer({ storage: authorImageStorage });

// Настройка multer для обложек книг
const uploadBookCover = multer({ storage: bookCoverStorage });

function setupImageRoutes(app) {
    app.get("/uploads/:folder/:imageName", (req, res) => {
        const { imageName, folder } = req.params;
        const imagePath = path.join(uploadDirectory + `/${folder}`, imageName);
        res.sendFile(imagePath);
    });
}

module.exports = { uploadAuthorImage, uploadBookCover, setupImageRoutes };