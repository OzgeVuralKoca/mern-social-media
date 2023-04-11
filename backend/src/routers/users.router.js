const express = require("express")
const User = require("../models/user")

const Router = express.Router()

// Users
Router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

module.exports = Router