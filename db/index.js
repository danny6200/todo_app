const { default: mongoose } = require("mongoose");
require("dotenv").config();


const connect = (url) => {
    mongoose.connect(url || process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB successfully!")
    });

    mongoose.connection.on("error", (error) => {
        console.log("Cannot connect to database:", error.message)
    });
}


module.exports = { connect }