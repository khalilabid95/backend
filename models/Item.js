const mongoose = require('mongoose');
const mongooseCloudinary = require('mongoose-cloudinary');
const article = require('./Article')
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    describtion: {
        type: String,
        required: true
    },
    photos: [{
        type: mongoose.Schema.Types.CloudinaryImage
    }],
    categorie:{
        type: String,
        required: true
    },
    articles: {
        type: [article.schema],
        required: true,
        default:[]
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;