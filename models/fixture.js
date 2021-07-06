const mongoose = require("mongoose")

const fixtureSchema = new mongoose.Schema({
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    matchday: {
        type: Number,
        required: true
    },
    stadium: {
        type: String,
        required: true
    },
    vote1: {
        type: Number,
        required: true
    },
    vote2: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("fixture", fixtureSchema)