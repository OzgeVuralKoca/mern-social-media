const jwt = require("jsonwebtoken")

const secretKey = "My Secret Key 1234 My Secret Key *** My Secret Key 1234 My Secret Key *** My Secret Key 1234"

const options = {
    expiresIn: "1d"
}

const token = (payload) => {
    return jwt.sign(payload, secretKey, options)
}

module.exports = token