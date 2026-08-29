
const add_to_cart = require('./models/cart_schema');
const connectDB = require('./db/connect')
const Product = require('./models/model_data');

require('dotenv').config();


const populate_cart = async (req, res) => {
    try {
        await connectDB(process.env.MONGODB_URI);
        const product_to_be = await Product.findById('6a8e6feae1234eda01c54aee')
        if (!product_to_be) {
            console.log("iykyk");
            process.exit(1);
        }
        console.log("database connected no issue");
        await add_to_cart.create({
            user: {

                _id: "66c91a7f2e8b4a1234567890",
                name: "Victor",
                email: "victor14@gmail.com",
                password: "$2b$10$"


            },
            items: [
                {
                    product: product_to_be,
                    quantity: 4




                },



            ]

        })
        console.log("Your cart has been created Succesfully ");
        process.exit(0);


    } catch (error) {
        console.log(error);
        process.exit(1);

    }

}

populate_cart();