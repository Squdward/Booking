const path = require("path");
const multer = require("multer");

function setupImageRoutes(app) {
    const uploadDirectory = path.join(__dirname, '../..', "uploads");
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDirectory);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });

    const upload = multer({ storage: storage });

    app.get("/uploads/:folder/:imageName", (req, res) => {
        const { imageName, folder } = req.params;
        const imagePath = path.join(uploadDirectory + `/${folder}`, imageName);
        res.sendFile(imagePath);
    });
}

module.exports = { setupImageRoutes };