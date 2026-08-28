const express = require('express');
const authIT = require('../middleware/auth');
const router = express();
const {
    getAllProducts,
    addToCart

} = require('../controllers/methods')
const { register, login } = require('../controllers/login');

router.route('/').get(authIT, getAllProducts);
router.route('/addToCart').post(addToCart)
router.route('/register').post(register)
router.route('/login').post(login);

module.exports = router;
