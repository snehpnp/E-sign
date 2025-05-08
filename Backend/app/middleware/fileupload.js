const multer = require("multer");
const express = require("express");
const app = express();
const path = require('path');
const digits = '0123456789';
var datetime = new Date();
var fs = require('fs-extra');
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("application/pdf")) {
        cb(null, true);
    } else {
        cb("Please upload only pdf.", false);
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

 var uploadFile = multer({ storage: storage, fileFilter: imageFilter});
//var uploadFile = multer({ fileFilter: imageFilter });
//var uploadFile = multer({ fileFilter: imageFilter });
module.exports = uploadFile;