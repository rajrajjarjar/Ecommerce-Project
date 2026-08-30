
const user = require('../models/model_user');
const validator = require("validator");
const { badRequest, unauthanticated } = require('../errors/index_error');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


require('dotenv').config();

const register = async (req, res) => {
    const { name, Email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!name) {
        throw new badRequest("Please provide name to register");

    }
    if (!password) {
        throw new badRequest("Please provide password to register");
    }
    if (!Email || !validator.isEmail(Email)) {
        throw new badRequest("Please review your email, its invalid or missing");
    }
    const newUser = await user.create({
        name: name,
        Email: Email,
        password: hashedPassword,
        role: role

    })
    res.status(200).json({
        success: true,
        message: "user registered succesfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.Email,
            role: newUser.role
        }
    })



}



const login = async (req, res, next) => {
    const { Email, password } = req.body;
    if (!Email || !password) {
        throw new badRequest('Please provide all the asked credentials');

    }
    const User = await user.findOne({ Email });
    if (!User) {
        throw new badRequest('Email doesnt exist');
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
        throw new unauthanticated('password doesnt match');
    }

    const token = jwt.sign({ id: User._id, Email: Email }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.status(200).json({
        message: "login succesfull",
        token: token
    })

}
module.exports = { register, login };