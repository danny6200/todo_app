const UserModel = require("../db/models/users.Model");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const bearerTokenAuth = async (req, res, next) => {
    try {
        
        const token = req.cookies.token

        if (token)
            decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findOne({ email: decoded.email, _id: decoded._id });

        if (!user){
            res.redirect("/auth/log_in")
        }

        req.locals.user = user;

        next()
    } catch (error) {
        res.redirect("/")
    }
}


module.exports = { bearerTokenAuth };