const express = require('express')
const app = express();
const router = require('./routes/routes');
const connectDb = require('./db/connect');
const errorHandler = require('./middleware/Error-Handler')

require('dotenv').config();


//normal middleware

app.use('/api/v1', router);











//error middleware
app.use(errorHandler);



const start = async () => {
    try {
        await connectDb(process.env.MONGODB_URI);
        app.listen(3000, () => {
            console.log(" superr saiyannnnn Independentttttt");
        })

    } catch (err) {
        console.error("Failed to start server:", err);

    }
}

start();