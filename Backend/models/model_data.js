const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        immutable: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        stars: {
            type: Number,
            default: 0,
            min: 0,
            max: 5

        },
        count: {
            type: Number,
            required: true,
            min: 0
        }
    },
    priceCents: {
        type: Number,
        required: true
    },
    keywords: {
        type: [String],
        required: false
    }



})
const Product = mongoose.model("Product", productSchema);
module.exports = Product;