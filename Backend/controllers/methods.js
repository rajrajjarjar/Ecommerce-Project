const Product = require('../models/model_data');


const getAllProducts = async (req, res) => {
    const Result = await Product.find();
    res.status(200).json(Result)



}
const addToCart = (req, res) => {
    res.send("nncn")
}

module.exports = {
    getAllProducts,
    addToCart
}