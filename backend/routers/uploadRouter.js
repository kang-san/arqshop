const multer = require('multer');
const express = require('express');
const { isAuth } = require('../utils.js');
const { s3Uploadv2, s3Uploadv3 } = require("../s3Service");
const uploadRouter = express.Router();
const uuid = require('uuid').v4;
const Product = require('../models/productModel.js');
const dotenv = require('dotenv') ;
dotenv.config({
    path : "../.env"
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000000000, files: 2 },
});


uploadRouter.post( '/',  upload.array('image'),
    async (req, res) => {
        try {
            const results = await s3Uploadv2(req.files);
            console.log(results);
            return res.json({ status: "success" });
        } catch (err) {
            console.log(err);
        }

    }
)


module.exports= uploadRouter;




// const productId = req.params.id;
// const product = await Product.findById(productId);
// const uploadImage = req.file.location;
// if (product) {
//     product.image = uploadImage;
// }
// await product.save();
// console.log("update 성공 >>>>>>> " + uploadImage)
// res.json({status: 'OK', uploadImage});