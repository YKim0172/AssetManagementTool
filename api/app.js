//express related
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
//Parsers
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const stockTickerRoutes = require('./routes/stockTicker');

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

//Routing
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/stockTicker', stockTickerRoutes);

module.exports = app;