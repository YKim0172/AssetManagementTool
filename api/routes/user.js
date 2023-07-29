const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const Category = require('../models/Category.js');
const StockTicker = require('../models/StockTicker.js');

const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY // Replace this
const finnhubClient = new finnhub.DefaultApi();

router.post('/register', async (req, res, next) => {
    const {name, email, password} = req.body;
    try {
        const newUserCreated = await User.create({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.status(200).json(newUserCreated);
    } catch (error) {
        res.status(422).json(error)
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({ email: req.body.email });
    if (userDoc) {  //if there is an email registration
        //now check the password
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
                name:userDoc.name
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('password is NOT AOKya');
        }
    } else {
        res.json(userDoc);
    }
});

router.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
});

router.post('/getGroups', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const listOfGroups = await Category.find({ creator: userData.id });
            res.json(listOfGroups);
        });
    } else {
        res.json(null);
    }
});



router.post('/getTickersForGroup', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            //get an array of user's groups
            const listOfCategory = await Category.find({ creator: userData.id });
            //array containing group objects

            //this array will be sent with payload
            let listOfTickersForEachCategory = [];
            let listOfTickers;

            let categoryID = "";
            for (let i = 0; i < listOfCategory.length; i++) {
                categoryID = (listOfCategory[i]._id).toString();
                listOfTickers = await StockTicker.find({ category: categoryID });
                listOfTickersForEachCategory.push(listOfTickers);
            }
            res.json(listOfTickersForEachCategory);
        });
    } else {
        res.json(null);
    }
});

router.post('/getDataForOverview', (req, res) => {
    const {token} = req.cookies;
    let {string} = req.body;

    let profitsList;
    let totalTickers;
    let numTickersFinished = 0;


    if (token && string === 'START') {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            const numTickers = await StockTicker.find({ user: userData.id });
            totalTickers = numTickers.length;

            if (numTickers.length === 0) {
                res.json({
                    message: 'no data'
                })
            }

            const categories = await Category.find({ creator: userData.id });

            profitsList = new Array(categories.length).fill(0);
            let categoryNameList = [];

            for (let i = 0; i < categories.length; i++) {
                categoryNameList.push(categories[i].category_name);
                const tickers = await StockTicker.find({ category: categories[i]._id });
                for (let j = 0; j < tickers.length; j++) {
                    finnhubClient.quote(tickers[j].ticker, (error, data, response) => {
                        if (data === null) {

                        } else {
                            profitsList[i] += ((data.c - tickers[j].avg_price_bought) * tickers[j].quantity_bought);
                            numTickersFinished++;
                            if (numTickersFinished === totalTickers) {
                                res.json({
                                    message: 'data sent',
                                    profitsList: profitsList,
                                    categoryNames: categoryNameList
                                });
                            }
                        }
                    });
                }
            }
        });
    } else {
        res.json(null);
    }
});

router.post('/getPortfolioSummary', (req, res) => {
    const {token} = req.cookies;
    const {start} = req.body;
    let capitalUsed = 0;
    let portfolioValue = 0;
    let profitLoss = 0;
    let numTickersFinished = 0;
    if (token && start === 'START') {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            const allTickers = await StockTicker.find({ user: userData.id });
            //go through every single ticker and do the calculations
            if (allTickers.length === 0) {
                res.json({
                    message: "no data"
                });
            }
            for (let i = 0; i < allTickers.length; i++) {
                capitalUsed += (allTickers[i].avg_price_bought * allTickers[i].quantity_bought);
                //get the current stock price and find the value of the portfolio now
                finnhubClient.quote(allTickers[i].ticker, (error, data, response) => {
                    if (data === null) {

                    } else {
                        portfolioValue += ((data.c) * allTickers[i].quantity_bought);
                        numTickersFinished++;
                        if (numTickersFinished === allTickers.length) {
                            profitLoss = portfolioValue - capitalUsed;
                            res.json({
                                message: "data sent",
                                capital_used: capitalUsed,
                                portfolio_value: portfolioValue,
                                profit_loss: profitLoss
                            });
                        }
                    }
                });
            }
        });
    } else {
        res.json(422);
    }
});

router.post('/getDataForGroup', (req, res) => {
    const {token} = req.cookies;
    let {string, categoryID} = req.body;
    
    let profitsList;
    let numTickersFinished = 0;

    if (token && string === 'START') {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            const tickersForGroup = await StockTicker.find({ category: categoryID });
            profitsList = new Array(tickersForGroup.length).fill(0);
            let tickerNameList = [];
            for (let i = 0; i < tickersForGroup.length; i++) {
                tickerNameList.push(tickersForGroup[i].ticker);
                finnhubClient.quote(tickersForGroup[i].ticker, (error, data, response) => {
                    if (data === null) {

                    } else {
                        profitsList[i] = ((data.c - tickersForGroup[i].avg_price_bought) * tickersForGroup[i].quantity_bought);
                        numTickersFinished++;
                        if (numTickersFinished === tickersForGroup.length) {
                            res.json({
                                profitsList: profitsList,
                                tickerNames: tickerNameList,
                            });
                        }
                    }
                });
            }
        })
    } else {
        res.status(422).json();
    }
});

router.post('/getPercentForGroup', async (req, res) => {
    try {
        const {token} = req.cookies;
        const {categoryID} = req.body;
    
        let totalCategory = 0;
        let totalPortfolio = 0;
        let percentage = 0;
        let categoryName = "";
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                const categoryObj = await Category.findOne({ _id: categoryID });
                categoryName = categoryObj.category_name;
                const tickers = await StockTicker.find({ user: userData.id });
                for (let i = 0; i < tickers.length; i++) {
                    totalPortfolio += (tickers[i].avg_price_bought * tickers[i].quantity_bought);
                    if (tickers[i].category.toString() === categoryID) {
                        totalCategory += (tickers[i].avg_price_bought * tickers[i].quantity_bought);
                    } 
                }
                percentage = (totalCategory / totalPortfolio * 100).toFixed(2);
                res.json({
                    percent: percentage,
                    categoryName: categoryName
                });
            })
        }
    } catch (error) {
        res.json(error);
    }   
});

router.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

module.exports = router;