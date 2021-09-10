const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const uploadImage = require("./middleware/multer");
const uploadToCloudinary = require("./cloudinary/uploadToCloudinary");
const cloudinary = require("cloudinary").v2;
const port = process.env.PORT || 4000;

// Configuration for cloudinary
cloudinary.config({
  cloud_name: "kazmi066",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("some get request");
});

app.post("/image", uploadImage, (req, res) => {
  const result = uploadToCloudinary(req, res);
  res.send(result);
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
