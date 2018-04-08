const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Creat a schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

//Creat a model
const User = mongoose.model('user', userSchema)
module.exports = User