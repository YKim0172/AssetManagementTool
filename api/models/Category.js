const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    category_name: {type: String, required: true},
    fund_total: { type: Number, default: 0},
});

module.exports = mongoose.model('Category', categorySchema);