const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth, isAdmin } = require('../utils.js');
const AWS = require('aws-sdk');

const dotenv = require('dotenv')
dotenv.config({
  path : ".env"
});


const uploadRouter = express.Router();



// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });
//
// const upload = multer({ storage });
//
// uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
//   console.log("파일 업로드")
//   res.send(`/${req.file.path}`);
// });

const accessKeyId =  process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_config_region;
const bucket = process.env.AWS_BUCKET;

console.log("File uploase >>>>>>>>>>>>>> START ")


AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

const s3 = new AWS.S3(AWS.config.update);

console.log("File uploase >>>>>>>>>>>>>>  "+ region)

const storageS3 = multerS3({
  s3: s3,
  bucket: bucket,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storageS3});

console.log("File uploase >>>>>>>>>>>>>> storage ")


uploadRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {



    })
);



module.exports= uploadRouter;
