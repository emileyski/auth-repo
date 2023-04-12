const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./router');
const errorMiddleware = require('./middlewares/error-middleware');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router)
app.use(errorMiddleware);


const getTime = () => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedDate = `${date}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`listen at port ${PORT} : ${getTime()}`));
    } catch (e) {
        console.log(e);
    }
}

start();