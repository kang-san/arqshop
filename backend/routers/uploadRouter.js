const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');

const { isAuth } = require('../utils.js');
const uploadRouter = express.Router();
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

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});

uploadRouter.post(
    '/',
    uploadS3.single('image'),
    async (req, res, next) => {
        console.log("S3 upload 도착 >>>> " + req)
        const productId = req.params.id;
        console.log("S3 upload product 찾기 >>>> " + req.params.id)

        const product = await Product.findById(productId);
        const uploadImage = req.file.location;
        if (product) {
            product.image = uploadImage;
        }
        await product.save();
        console.log("update 성공 >>>>>>> " + uploadImage)
        res.json({uploadImage});


    }
)

module.exports= uploadRouter;




