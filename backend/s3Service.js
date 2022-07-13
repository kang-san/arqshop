const { AWS } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;

exports.s3Uploadv2 = async (files) => {

    AWS.config.update({
        accessKeyId: process.env.AWS_ACESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    const s3 = new AWS.S3();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer,
        };
    });

    return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

exports.s3Uploadv3 = async (files) => {
    const s3client = new S3Client();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer,
        };
    });

    return await Promise.all(
        params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
};