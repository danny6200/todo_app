const express = require("express");
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser")
const db = require("./db");
const authRouter = require("./routes/auth.Route");
const taskRouter = require("./routes/tasks.Route");
require("dotenv").config();


const app = express();

db.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());


app.set('view engine', 'ejs')

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
    res.render("home")
})
app.get("*", (req, res) => {
    res.render("404")
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})