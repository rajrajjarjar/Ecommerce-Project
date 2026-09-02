const express = require('express')
const app = express();
const router = require('./routes/routes');
const connectDb = require('./db/connect');
const errorHandler = require('./middleware/Error-Handler')
const notFound = require('./middleware/notFound');




require('dotenv').config();

const cors = require("cors");



app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://simpleshop-delta.vercel.app"
    ]
}));
app.use(express.json());

//normal middleware
app.use(express.json());

app.use('/api/v1', router);











//error middleware
app.use(errorHandler);
app.use(notFound);




const start = async () => {
    try {
        await connectDb(process.env.MONGODB_URI);
        app.listen(process.env.PORT || 3000, () => {
            console.log(" superr saiyannnnn Independentttttt");
        })

    } catch (err) {
        console.error("Failed to start server:", err);

    }
}

start();