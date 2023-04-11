const express = require("express")
const LikePost = require("../models/like-post")
const Router = express.Router()
const { v4: uuidv4 } = require("uuid")

Router.post("/likeOrUnlike", async (req, res) => {
    try {
        const { userId, postId, userName } = req.body
        let likePost = await LikePost.findOne({ userId: userId, postId: postId, userName: userName })
        if (likePost == null) {
            likePost = new LikePost({
                _id: uuidv4(),
                userId: userId,
                postId: postId,
                userName: userName,
            })
            await likePost.save()
        } else {
            await LikePost.findByIdAndRemove(likePost._id)
        }
        res.json({})
    } catch (error) {
        res.status(403).json({ message: "Email is used!" })
    }
})

module.exports = Router