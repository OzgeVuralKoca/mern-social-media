const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    content: String,
    createdDate: String,
    video: Object,
    image: Object
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post