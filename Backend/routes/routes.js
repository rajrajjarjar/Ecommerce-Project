const express = require('express');
const router = express();
const {
    getAllProducts,
    addToCart

} = require('../controllers/methods')

router.route('/').get(getAllProducts);
router.route('/addToCart').post(addToCart)

module.exports = router;
