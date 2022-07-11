const multer = require('multer');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../utils.js');
const uploadRouter = express.Router();


const upload = multer({dest: 'uploads/'});



uploadRouter.post(
    '/',
    isAuth,
    upload.single('image'),
    expressAsyncHandler(async (req, res) => {
        const image = req.file.originalname;

        console.log("multer req.file.orignal >>>>>>>>>>>>>>> "+ req.file.originalname);
        if(image === undefined) {
            return res.status(400).json({success: false, message: err.message});

        }
        res.send('Uploaded : '+req.file.originalname);
        console.log("multer req.file.orignal >>>>>>>  server res success >>>>>>>> "+ req.file.originalname);
    })
)

module.exports= uploadRouter;




