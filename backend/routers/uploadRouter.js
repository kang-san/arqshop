const multer = require('multer');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth } = require('../utils.js');
const uploadRouter = express.Router();


const upload = multer({dest: 'upload/'});



uploadRouter.post(
    '/',
    isAuth,
    upload.single('image'),
    expressAsyncHandler(async (req, res) => {
        const image = req.file.filename;

        console.log("multer req.file >>>>>>>>>>>>>>> "+ req.file.filename);
        if(image === undefined) {
            return res.status(400).json({success: false, message: err.message});

        }
        res.send('Uploaded : '+req.file.filename);
        console.log("multer req.file >>>>>>>  server res success >>>>>>>> "+ req.file.filename);
    })
)

module.exports= uploadRouter;




