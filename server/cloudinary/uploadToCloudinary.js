const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

const uploadToCloudinary = (req, res) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    // To store the url in Database, Grab the URL from result
    console.log(result.url);
    console.log(result);
    return result;
  }

  const finalUpload = upload(req);
  return finalUpload;
};

module.exports = uploadToCloudinary;
