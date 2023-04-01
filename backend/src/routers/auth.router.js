const express = require("express")
const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const upload = require("../services/uploadService")
const removeFile = require("../services/removeFileService")
const File = require("../dtos/file")
const token = require("../services/tokenService")

const Router = express.Router()

Router.post('/register', upload.single("image"), async (req, res) => {
    try {
        const user = new User(req.body)
        const checkEmail = await User.findOne({ email: user.email })
        if (checkEmail == null) {
            const file = new File(req.file)
            if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
                if (file.size > 5242880) {
                    removeFile([req.file])
                    res.status(403).json({ message: "Profile picture must be smaller than 5 MB." })
                } else {
                    user._id = uuidv4()
                    user.createdDate = new Date().setHours(new Date().getUTCHours() + 3)
                    user.profileImage = req.file
                    await user.save()
                    const model = { token: token(), user: user };
                    res.json(model);
                }
            } else {
                removeFile(req.file)
                res.status(403).json({ message: "You can only upload profile pictures in JPEG, JPG, or PNG format!" })
            }
        } else {
            removeFile(req.file)
            res.status(403).json({ message: "Email is used!" })
        }
    }
    catch (error) {
        removeFile(req.file)
        res.status(500).json({ message: error.message })
    }
})

Router.post("/login", async (req, res) => {
    try {
        const { emailOrUserName, password } = req.body
        let user = await User.findOne({ email: emailOrUserName }) || await User.findOne({ userName: emailOrUserName })
        if (user == null) {
            res.status(403).json({ message: "User is not found!" })
        } else {
            if (user.password != password) {
                res.status(403).json({ message: "Password is wrong!" })
            } else {
                const model = { token: token(), user: user }
                res.json(model)
            }
        }
    } catch (error) {
        removeFile(req.file)
        res.status(500).json({ message: error.message })
    }
})

module.exports = Router