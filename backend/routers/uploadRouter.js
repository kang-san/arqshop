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


const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION
});



const upload = multer({
        storage : multerS3({
            s3,
            bucket: '7zone-product',
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb){
                cb(null, {fieldName: file.fieldName});
            },
            key(req, file, cb){
                const ext = path.extname(file.originalname);
                cb(null, `${uuid()}${ext}`);
            },
    }),
})


uploadRouter.post(
    '/',
    isAuth,
    upload.single('image'),
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        const uploadImage = req.file.location;
        if (product) {
            product.image = uploadImage;
        }
        await product.save();
        res.json({status: 'OK', uploadImage});
    })
)

module.exports= uploadRouter;




