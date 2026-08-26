const Product = require('./models/model_data');
const data_json = require('./Data/products');

require('dotenv').config()

const connectDb = require('./db/connect');


const populate = async () => {
    try {
        await connectDb(process.env.MONGODB_URI);
        console.log("databse conectedd yaaa");
        await Product.deleteMany();
        await Product.create(data_json);
        console.log("workkk succesfulllll");
        process.exit(0)

    } catch (error) {
        console.log("databse error", error);
        process.exit(1);

    }

}
populate()
