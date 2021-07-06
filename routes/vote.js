const express = require("express")
const router = express.Router()
const Fixture = require("../models/fixture")
const Voter = require("../models/voter")

router.get("/:matchday",async (req,res) => {
    if(!req.session.userId) {
        res.redirect("/voters/login")
        return
    }
    try {
        const game = await Fixture.findOne({matchday:req.params.matchday})
        res.render("vote",{game:game})
    }
    catch(err) {
        res.sendStatus(500)
    }
})

router.post("/",async (req,res) => {
    if(!req.session.userId) {
        res.redirect("/voters/login")
        return
    }
    const matchday = parseInt(req.body.matchday)
    const vote = req.body.vote_form
    const vote1_count = parseInt(req.body.vote1_count) 
    const vote2_count = parseInt(req.body.vote2_count)
    try {
        const voter = await Voter.findById(req.session.userId)
        if(voter.votes.includes(matchday) == true) {
            res.send("You cannot vote multiple times for a single game")
            return
        }
        voter.votes.push(matchday)
        await voter.save()
        if(vote == "homeVote") {
            const updateVote = await Fixture.findOneAndUpdate({matchday:matchday},{vote1:vote1_count+1})
            res.redirect("/fixtures/")
        }
        else {
            const updateVote = await Fixture.findOneAndUpdate({matchday:matchday},{vote2:vote2_count+1})
            res.redirect("/fixtures/")
        }
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router