const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = mongoose.connect('mongodb+srv://stefan01:12345@cluster0.tnumo.mongodb.net/page-test?retryWrites=true&w=majority')
        console.log(`MongoDB connected: ${(await conn).connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB;

