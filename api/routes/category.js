const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User.js');
const Category = require('../models/Category.js');
const StockTicker = require('../models/StockTicker.js');

router.post('/createCategory', async (req, res, next) => {
    const {creator, category_name} = req.body;
    try {
        const newCategory = await Category.create({
            //cat_id is already made
            creator,
            category_name,
            fund_total: 0
        });
        res.status(200).json(newCategory)
    } catch (error) {
        res.status(422).json(error);
    }
});

router.post('/deleteCategory', async (req, res, next) => {
    const {user_id, category_id} = req.body;
    try {
        const tickersDeleted = await StockTicker.deleteMany({ category: category_id });
        const categoryDeleted = await Category.deleteOne({ creator: user_id, _id: category_id });
        res.json(categoryDeleted);
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;