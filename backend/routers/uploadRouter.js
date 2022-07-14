const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const { isAuth } = require('../utils.js');
const uploadRouter = express.Router();
// const uuid = require('uuid').v4;
const Product = require('../models/productModel.js');
const dotenv = require('dotenv') ;
dotenv.config({
    path : "../.env"
});

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
})

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl : 'public-read-write',
//         bucket: process.env.AWS_BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     }),
// });
let upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
});

uploadRouter.post(
    '/',
    upload.single('image'),
    async (req, res, next) => {
        try {

            var base64data = new Buffer(req.files[0].buffer, 'binary');

            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: 'sample.png', // file name that you want to save in s3 bucket
                Body: base64data,
                ACL: "public-read",
                ContentType: "image/png"
            }

            s3.upload(params, (err, data) => {
                if (err) {
                    console.log("err : ", err)
                    res.send({ success: false });
                }
                else {
                    console.log("data : ", data)
                    res.send({ success: true, result: data })
                }
            });

        }
        catch (ERR) {
            console.log("ERR : ", ERR)
            res.send({ success: false })
        }
    }
)

module.exports= uploadRouter;




