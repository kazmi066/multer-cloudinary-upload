const multer = require("multer");

const storage = multer.memoryStorage();

// Middleware to grab the image through multer Storage
const uploadImage = multer({ storage }).single("img_photo");

module.exports = uploadImage;
