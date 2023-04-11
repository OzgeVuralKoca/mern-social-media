const connection = require("./src/database/db")
const express = require("express")
const cors = require("cors")
const path = require("path")

// Routers
const authRouter = require("./src/routers/auth.router")
const postRouter = require("./src/routers/post.router")
const likePostRouter = require("./src/routers/like-post.router")
const commentRouter = require("./src/routers/comment.router")
const usersRouter = require("./src/routers/users.router")

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

// User Router
app.use("/users", usersRouter)

// Post Router
app.use("/", postRouter)

// Like Post Router
app.use("/", likePostRouter)

// Comment Router
app.use("/comments", commentRouter)

// Listen Port
const port = 5000
app.listen(port, () => console.log("Server is working."))