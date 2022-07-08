const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth, isAdmin } = require('../utils.js');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/s3.json');
const uploadRouter = express.Router();

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION
});


const upload = (bucketName) =>
    multer({
        storageS3 : multerS3({
            s3,
            bucket: bucketName,
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb){
                cb(null, {fieldName: file.fieldName});
            },
            key(req, file, cb){
                cb(null, file.originalname); // 이름 설정
            },
    }),
})


uploadRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log(req.file);

        const uploadSingle = upload("7znoe").single('image');
        uploadSingle(req, res, (err) => {
                if(err)
                    return res.status(400).json({success: false, message: err.message});
                console.log(req.file)

                res.status(200).json({data: req.file})
            }
        )
    })
)

module.exports= uploadRouter;




