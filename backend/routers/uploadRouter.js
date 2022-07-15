const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const { isAuth } = require('../utils.js');
const uploadRouter = express.Router();
// const uuid = require('uuid').v4;
const Product = require('../models/productModel.js');
const dotenv = require('dotenv') ;
const fs = require('fs');
const path = require('path');


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

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};

uploadRouter.post(
    '/',
    async (req, res, next) => {
        // console.log("S3 upload 도착 >>>> " + req.file.location)
        // const productId = req.params.id;
        // console.log("S3 upload product 찾기 >>>> " + req.params.id)
        //
        // const product = await Product.findById(productId);
        // const uploadImage = req.file.location;
        // if (product) {
        //     product.image = uploadImage;
        // }
        // await product.save();
        // console.log("update 성공 >>>>>>> " + uploadImage)
        // res.json({status: 'OK', uploadImage});

        const fileStream = fs.createReadStream(req.file);
        fileStream.on('error', function(err) {
            console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        uploadParams.Key = path.basename(req.file);

// call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, expressAsyncHandler(function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                console.log("Upload Success", data.Location);
                res.json({status: 'OK', data});
            }
        }));



    }
)

module.exports= uploadRouter;




