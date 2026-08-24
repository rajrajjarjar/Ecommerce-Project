const getAllProducts = (req, res) => {
    res.send('<h1>YO BOY WELCOME TO CONTROLLERS</h1>');

}
const addToCart = (req, res) => {
    res.send('<h1>add this to the cart</h1>')
}
module.exports = {
    getAllProducts,
    addToCart
}