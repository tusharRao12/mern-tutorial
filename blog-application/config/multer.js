const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"blogs",
        allowedFormats:["jpg","png","webp"]
    },
});

const upload = multer({ storage });
module.exports = upload;