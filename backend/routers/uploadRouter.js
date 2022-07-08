const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth, isAdmin } = require('../utils.js');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/s3.json');



const uploadRouter = express.Router();

const s3 = new AWS.S3();

const storageS3 = multerS3({
  s3: s3,
  bucket: "7zone",
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb){
      cb(null, file.originalname); // 이름 설정
  }
});

const upload = multer({storage: storageS3});

console.log("File uploase >>>>>>>>>>>>>> storage ")


uploadRouter.post(
    '/',
    upload.single('image'),
    expressAsyncHandler(async (req, res) => {
        console.log(req.file);
        const image = req.file;
        if (image === undefined) {
            return res.status(400).send("이미지가 존재하지 않습니다.");
        }
        res.status(200).send(image);
    })
);



module.exports= uploadRouter;
