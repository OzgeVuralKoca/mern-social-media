const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

// .env Configurations
dotenv.config();

const secretKey = process.env.secretKey

const options = {
    expiresIn: "1d"
}

const token = () => {
    return jwt.sign({}, secretKey, options)
}

module.exports = token