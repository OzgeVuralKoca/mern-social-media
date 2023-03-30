const connection = require("./src/database/db")
const express = require("express")
const cors = require("cors")
const path = require("path")

// Routers
const authRouter = require("./src/routers/auth.router")
const postRouter = require("./src/routers/post.router")

// Database Connection
connection()

// For API requests
const app = express()

// can load for image file
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Json for Api Requests
app.use(express.json())

// Cors Policy
app.use(cors())

// Auth Router
app.use("/", authRouter)
app.use("/", postRouter)

//

// Listen Port
const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server is working."))