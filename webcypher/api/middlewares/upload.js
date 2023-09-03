const crypto = require('crypto');
const path = require('path');
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config()

// storage Room picture
mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    module.exports.bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "photos"
    });
});

const storage = new GridFsStorage({
    // url: "mongodb://127.0.0.1:27017/pli",
    url:   "mongodb+srv://webcypher:webcypher@webcypher.bvyfct2.mongodb.net/webcypher",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = req.user_id + ('.jpeg');
                const fileInfo = {
                    filename: filename,
                    bucketName: 'photos'
                };
                resolve(fileInfo);
            });
        });
    }
});

// Storage Media Items
const MediaStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.resolve('data/uploads');
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const newFileId = uuidv4();
        callback(null, `${newFileId}-${file.originalname}`);
        req.newFileId = newFileId;
    }
});

const MediaUpload = {
    storage: MediaStorage,
    limits: {
        fileSize: 1000000000000000,
    },
    
    fileFilter: (req, file, callback) => {
        const typesAllowed = [".mp4", ".mp3"];
        const ext = path.extname(file.originalname);
        if (!typesAllowed.includes(ext)) {
            return callback("Please upload a correct extension Video");
        }
        callback(null, true);
    },
    
};

const upload = multer({ storage });
const download = multer(MediaUpload).single("audio")

const file_upload = { upload, download };

module.exports = file_upload;