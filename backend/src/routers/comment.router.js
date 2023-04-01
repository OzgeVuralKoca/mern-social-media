const Comment = require("../models/comment")
const express = require("express")
const Router = express.Router()
const { v4: uuidv4 } = require("uuid")

Router.post("/add", async (req, res) => {
    try {
        const comment = new Comment(req.body)
        comment._id = uuidv4()
        comment.createdDate = new Date()
        await comment.save()
        res.json({message: "Comment is successful!"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = Router