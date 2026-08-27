const mongoose = require('mongoose');

const user_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true


    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true


    },
    password: {
        type: String,
        required: true,
        minlength: 6

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }



})
const user = mongoose.model("user", user_Schema);
module.exports = user;

