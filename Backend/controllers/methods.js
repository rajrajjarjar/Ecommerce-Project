const Product = require('../models/model_data');
const user = require('../models/model_user')
const add_to_cart = require('../models/cart_schema');


const getAllProducts = async (req, res) => {
    const Result = await Product.find();

    console.log("HEADERS:", req.headers);
    console.log(req.headers.authorization)
    res.status(200).json(Result)



}
const addToCart = async (req, res) => {

    const { id, Email } = req.user
    const { product, quantity } = req.body;
    const user_needed = await add_to_cart.findOne({
        user: id
    });
    const product_to_be = await Product.findById(product)
    if (!user_needed) {

        const cart = await add_to_cart.create({
            user: id,
            items: [
                {
                    product: product,
                    quantity: quantity
                }

            ]
        }




        )
        return res.status(200).json(cart)
    }

    const existingItem = user_needed.items.find(
        item => item.product.toString() === product
    );
    if (!existingItem) {
        user_needed.items.push({
            product: product,
            quantity
        });
    } else {
        existingItem.quantity += quantity;
    }

    await user_needed.save();
    res.status(200).json(user_needed);






}

module.exports = {
    getAllProducts,
    addToCart
}