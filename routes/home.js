const express = require("express")
const router = express.Router()
const fixture = require("../models/fixture")

router.get("/", (req, res) => {
    if(!req.session.userId) {
        res.redirect("/voters/login")
        return
    }
    res.render("home")
})

module.exports = router