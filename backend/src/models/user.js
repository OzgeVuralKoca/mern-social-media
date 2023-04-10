const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    profileImage: {
        type: Object,
        required: true
    },
    location: String,
    about: String,
    webPage: String,
    workPlace: String,
    createdDate: Date,
    updatedDate: Date
})

const User = mongoose.model("User", userSchema)

module.exports = User