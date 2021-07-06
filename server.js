const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const bodyParser = require("body-parser")
const session = require("express-session")
const fixtureRouter = require("./routes/fixture")
const voteRouter = require("./routes/vote")
const votersRouter= require("./routes/voters")
const homeRouter = require("./routes/home")

mongoose.connect(process.env.DATABASE_URI,{useUnifiedTopology:true,useNewUrlParser: true,useFindAndModify: false})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to database"))

app.set("view engine","ejs")
app.use("/images", express.static("./images"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: "secret", resave: true, saveUninitialized: true}));

app.use("/voters",votersRouter)
app.use("/home",homeRouter)
app.use("/fixtures",fixtureRouter)
app.use("/vote",voteRouter)

app.get("/", (req, res) => {
    res.redirect("voters/login")
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => console.log("Server running on port 80"))