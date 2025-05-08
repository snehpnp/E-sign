const multer = require("multer");
const path = require('path');
const imageFilter = (req, file, cb) => {

    console.log('Multer File  Data-',file);

    if (file.mimetype.startsWith("application/pdf")) {
        cb("Please upload only image.", false);
    } else {
        cb(null, true);
    }
};

// console.log("__basedir",__basedir);
var imagepath = __dirname.replace('middleware', '');
var imagepathhh = path.join(__dirname, '../');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagepathhh + "images");
    },
    filename: (req, file, cb) => {
        cb(null, `e_sign-${file.originalname}`);
    },
});

var uploadImg = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadImg;