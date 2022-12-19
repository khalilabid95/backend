const mongoose = require('mongoose');


const commandSchema = new mongoose.Schema({
    articles: {
        type: [article.schema, { type: Number, required: true, default: 1, min: 1, max: 10 }],
        required: true,
        default:[]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})
