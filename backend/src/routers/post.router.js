const express = require("express")
const Post = require("../models/post")
const {v4:uuidv4} = require("uuid")

const Router = express.Router()

Router.post("/posts", async (req, res) => {
    try {
        const { pageSize, userId } = req.body;

        const posts =
            await Post.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "users"
                    }
                }
            ])
                .sort({ createdDate: -1 })
                .limit(pageSize)
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

Router.post("/post/add", async (req, res) => {
    try {
        const {userId, content} = req.body;

        const post = new Post({
            _id: uuidv4(),
            content: content,
            userId: userId,
            createdDate: new Date()
        });

        await post.save();

        res.json({message: "Post send successfuly!"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = Router