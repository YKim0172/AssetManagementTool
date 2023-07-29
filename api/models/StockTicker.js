const mongoose = require('mongoose');

const stockTickerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    ticker: {type: String, required: true},
    avg_price_bought: { type: Number, required: true },
    quantity_bought: { type: Number, required: true },
    percent_group: { type: Number, default: 0 },
    percent_portfolio: { type: Number, default: 0 }
});

module.exports = mongoose.model('StockTicker', stockTickerSchema);