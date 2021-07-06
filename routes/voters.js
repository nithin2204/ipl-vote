const express = require("express")
const router = express.Router()
const Voter = require("../models/voter")

router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",async (req,res) => {
    try {
        const checkVoter = await Voter.findOne({"email":req.body.email})
        if(checkVoter != null) {
            res.send("Account with that email already exists.")
            return
        }
        const voter = new Voter({email:req.body.email,password:req.body.password})
        const newVoter = await voter.save()
        res.send("Voter created successfully. <a href='/voters/login'>Login</a>")
    }
    catch(err) {
        console.log(err)
    }
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const voter = await Voter.findOne({ email: email, password: password })
        if(voter) {
            req.session.userId = voter.id
            res.redirect("/home/")
        }
        else {
            res.send("Either your login email or password is incorrect")
        } 
    }
    catch(err) {
        console.log(err)
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/voters/login")
})

module.exports = router