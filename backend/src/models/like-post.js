const mongoose = require("mongoose")

const likePostSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    postId: String,
    userName: String,
})

const LikePost = mongoose.model("LikePost", likePostSchema)

module.exports = LikePost