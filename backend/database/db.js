const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path : "../../.env"
});


const connectToDB = async () => {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}?authSource=admin`, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB connected :: ${process.env.DB_HOST}`);
};
//
// const connectToDB = async () => {
//     const connect = await mongoose.connect(`mongodb://localhost:27017/amazona?authSource=admin`, {
//         dbName: process.env.DB_NAME,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     console.log(`MongoDB connected :: ${process.env.DB_HOST}`);
// };


module.exports = connectToDB;