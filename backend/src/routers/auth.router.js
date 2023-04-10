const express = require("express")
const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const upload = require("../services/uploadService")
const removeFile = require("../services/removeFileService")
const File = require("../dtos/file")
const token = require("../services/tokenService")

const Router = express.Router()

// Register
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
                    user.location = ""
                    user.about = ""
                    user.webPage = ""
                    user.workPlace = ""
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

// Login
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

// Update
Router.post("/updateUser", async (req, res) => {
    try {
        const { _id, name, profession, webPage, workPlace, location, about } = req.body
        await User.findByIdAndUpdate(_id, {
            name: name,
            profession: profession, 
            location: location,
            webPage: webPage,
            workPlace: workPlace,
            about: about,
            updatedDate: Date.now(),
        })
        const updatedUser = await User.findById(_id);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = Router