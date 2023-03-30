const mongoose = require("mongoose")

const uri = "mongodb+srv://ozgevuralkoca:1@socialmediadb.tnctdws.mongodb.net/?retryWrites=true&w=majority"

const connection = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongodb connection successful")
    })
    .catch((err) => {
        console.log(`MongoDb connection is not working! Error + ${err}`)
    })
}

module.exports = connection