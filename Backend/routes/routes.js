const express = require('express');
const router = express();
const {
    getAllProducts,
    addToCart

} = require('../controllers/methods')
const { register } = require('../controllers/login');

router.route('/').get(getAllProducts);
router.route('/addToCart').post(addToCart)
router.route('/register').post(register);

module.exports = router;
