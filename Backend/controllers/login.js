
const user = require('../models/model_user');
const validator = require("validator");
const { badRequest } = require('../errors/index_error');

require('dotenv').config();

const register = async (req, res) => {
    const { name, Email, password, role } = req.body;
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
        password: password,
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
module.exports = { register };