const user = require('./models/model_user');

const connectDb = require('./db/connect')
require('dotenv').config();

const populate = async () => {

    try {
        console.log("succesfully in the function reporting")

        await connectDb(process.env.MONGODB_URI);
        console.log("succesfully connected with the database saiyannn")

        await user.create({
            name: "Raj_Doom",
            Email: "doom@gmail.com",
            password: "doombot",


        })
        console.log("mission succesfull");
        process.exit(0);




    } catch (err) {

        console.log(err)
        process.exit(1);

    }

}

populate();