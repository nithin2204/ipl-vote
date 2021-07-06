const express = require("express")
const router = express.Router()
const fixture = require("../models/fixture")

router.get("/",async (req,res) => {
    if(!req.session.userId) {
        res.redirect("/voters/login")
        return
    }
    try {
        const fixtures = await fixture.find()
        res.render("fixture",{fixtures:fixtures})
    }
    catch(err) {
        console.log(err)
    }
})

router.get("/add", (req, res) => {
    res.render("addFixture")
})

router.post("/add", async(req, res) => {
    const { homeTeam, awayTeam, matchDay, stadium } = req.body
    try {
        const newFixture = new fixture({ team1: homeTeam, team2: awayTeam, matchday: matchDay, stadium: stadium, vote1: 0, vote2: 0 })
        await newFixture.save()
        res.send("Fixture added successfully")
    }catch(err) {
        res.send(err)
    }
})

module.exports = router