const express = require("express")
const Post = require("../models/post")
const { v4: uuidv4 } = require("uuid")
const upload = require("../services/uploadService")

const Router = express.Router()

// Read Posts
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
                },
                {
                    $lookup: {
                        from: "likeposts",
                        localField: "_id",
                        foreignField: "postId",
                        as: "likes"
                    }
                },
                {
                    $lookup: {
                        from: "comments",
                        let: { postId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$postId", "$$postId"] }
                                }
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "userId",
                                    foreignField: "_id",
                                    as: "user"
                                }
                            },
                            {
                                $unwind: "$user"
                            }
                        ],
                        as: "comments"
                    }
                },
                { $sort: { createdDate: -1 }},
                { $limit: pageSize }
            ])
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Add Post
Router.post("/post/add", upload.single("file"), async (req, res) => {
    try {
        const { userId, content, fileType } = req.body;
        const post = new Post({
            _id: uuidv4(),
            content: content,
            userId: userId,
            createdDate: new Date(),
            video: fileType == "video" ? req.file : {},
            image: fileType == "image" ? req.file : {}
        });

        await post.save();
        res.json({ message: "Post send successfuly!" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete Post
Router.post("/post/removeById", async(req, res) => {
    try {
        const _id = req.body._id
        await Post.findByIdAndRemove(_id);
        res.json({message: "Post is deleted!"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = Router