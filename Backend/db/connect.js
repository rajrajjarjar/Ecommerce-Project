const mongoose = require('mongoose');

const connectDb = async (url) => {
    await mongoose.connect(url);
    console.log("databse connected");

}
module.exports = connectDb;
