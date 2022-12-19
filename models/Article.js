const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    size: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    }
})

const Item = mongoose.model('Article', articleSchema);

module.exports = Article;