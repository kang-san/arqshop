const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../utils.js');
const AWS = require('aws-sdk');
const uploadRouter = express.Router();
const uuid = require('uuid').v4;
const path = require('path');
const Product = require('../models/productModel.js');
const dotenv = require('dotenv') ;
dotenv.config({
    path : "../.env"
});

const ACCESS_KEY = process.env.S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.S3_SECRET_KEY;
const REGION = process.env.S3_BUCKET_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

// AWS ACCESS KEY를 세팅합니다.
AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
});

// 버킷에 맞는 이름과 리전을 설정합니다.
const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
});



const upload = multer({
        storage : multerS3({
            s3,
            bucket: S3_BUCKET,

            metadata: function (req, file, cb){
                cb(null, {fieldName: file.fieldName});
            },
            key(req, file, cb){
                const ext = path.extname(file.originalname);
                cb(null, `${uuid()}${ext}`);
            },

            // s3: s3,
            // bucket: S3_BUCKET,
            // metadata: function (req, file, cb) {
            //     cb(null, Object.assign({}, req.body));
            // },
            // key: function (req, file, cb) {
            //     cb(null, req.params.id + ".jpg");
            // }
    }),
})


uploadRouter.post(
    '/',
    isAuth,
    upload.single('image'),
    expressAsyncHandler(async (req, res, next) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        const uploadImage = req.file.location;
        if (product) {
            product.image = uploadImage;
        }
        await product.save();
        console.log("update 성공 >>>>>>> " + uploadImage)
        res.json({status: 'OK', uploadImage});
    })
)

module.exports= uploadRouter;




