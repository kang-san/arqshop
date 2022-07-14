const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const { isAuth } = require('../utils.js');
const uploadRouter = express.Router();
// const uuid = require('uuid').v4;
const Product = require('../models/productModel.js');
const dotenv = require('dotenv') ;
const fs = require('fs');

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
        const fileContent = fs.readFileSync(req.file.filename);

        console.log("req 도착")

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            key: 'upload.jpg',
            body: fileContent
        }

        // uploading
        s3.upload(params, function (err, data){
            if(err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`)
        })
    }
)

module.exports= uploadRouter;




