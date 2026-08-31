const express = require('express');
const authIT = require('../middleware/auth');
const router = express();
const {
    getAllProducts,
    addToCart

} = require('../controllers/methods')
const { register, login } = require('../controllers/login');

router.route('/products').get(getAllProducts);
router.route('/addToCart').post(authIT, addToCart)
router.route('/auth/register').post(register)
router.route('/auth/login').post(login);

module.exports = router;
