const Product = require('../models/model_data');
const user = require('../models/model_user')


const getAllProducts = async (req, res) => {
    const Result = await Product.find();

    console.log("HEADERS:", req.headers);
    console.log(req.headers.authorization)
    res.status(200).json(Result)



}
const addToCart = (req, res) => {

    const { id, Email } = req.user
    const product_id = req.body





}

module.exports = {
    getAllProducts,
    addToCart
}