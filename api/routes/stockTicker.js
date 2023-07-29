const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StockTicker = require('../models/StockTicker.js');

router.post('/createStockTicker', async (req, res, next) => {
    const {user_id, category_id, ticker, avg_price, quantity} = req.body;
    try {
        const newStockTicker = await StockTicker.create({
            user: user_id,
            category: category_id,
            ticker: ticker,
            avg_price_bought: avg_price,
            quantity_bought: quantity
        });
        res.status(200).json(newStockTicker);
    } catch (error) {
        res.status(422).json(error);
    }
    
});


router.post('/getAllStockTickers', async (req, res, next) => {
    const {category_id} = req.body;
    try {
        const listAllStockTickers = await StockTicker.find({ category: category_id});
        res.json(listAllStockTickers);
    } catch (error) {
        res.json(null);
    }
})

router.post('/deleteStockTicker', async (req, res, next) => {
    const {ticker_id} = req.body;
    try {
        const stockTickerDeleted = await StockTicker.deleteOne({ _id: ticker_id });
        res.json(stockTickerDeleted);
    } catch (error) {
        res.json(error);
    }
})

router.post('/editStockTicker', async (req, res, next) => {
    const {ticker_id, new_quantity, new_price} = req.body;
    try {
        await StockTicker.updateOne(
            {_id: ticker_id },
            { $set: 
                { quantity_bought: new_quantity, avg_price_bought: new_price }
            }
            ); 
        res.status(200).json();
    } catch (error) {
        res.json(error);
    }
})

router.post('/calculateTickerPercentages', async (req, res, next) => {
    const {user_id, category_id} = req.body;
    let totalAmountInvested = 0;
    let totalAmountForGroup = 0;
    let amountInvestedForTicker;
    try {
        //calculate sums of group/portfolio first
        const allTickersOfUser = await StockTicker.find({ user: user_id });
        for (let i = 0; i < allTickersOfUser.length; i++) {
            amountInvestedForTicker = (allTickersOfUser[i].quantity_bought * allTickersOfUser[i].avg_price_bought);
            if (allTickersOfUser[i].category.toString() === category_id) {
                totalAmountForGroup += amountInvestedForTicker;

            }
            totalAmountInvested += amountInvestedForTicker;
        }
        //update the % of group and portfolio
        for (let i = 0; i < allTickersOfUser.length; i++) {
            //update % of portfolio
            amountInvestedForTicker = ((allTickersOfUser[i].quantity_bought * allTickersOfUser[i].avg_price_bought) / totalAmountInvested * 100).toFixed(2);
            await StockTicker.updateOne(
                { _id: allTickersOfUser[i]._id },
                { $set: 
                    { percent_portfolio: amountInvestedForTicker }
                }
                );
            
            if (allTickersOfUser[i].category.toString() === category_id) {
                amountInvestedForTicker = ((allTickersOfUser[i].quantity_bought * allTickersOfUser[i].avg_price_bought) / totalAmountForGroup * 100).toFixed(2);
                await StockTicker.updateOne({ _id: allTickersOfUser[i]._id }, { $set: {percent_group: amountInvestedForTicker}});
            }
        }
        res.status(200).json();

    } catch (error) {
        res.status(422).json();
    }
})

module.exports = router;