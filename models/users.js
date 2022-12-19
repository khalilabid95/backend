
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    adress: {
        type: String,
        required: true,
    },
    admin:{
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)