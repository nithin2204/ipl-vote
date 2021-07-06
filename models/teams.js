const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    player1: {
        type:String,
        required: true
    },
    player2: {
        type:String,
        required: true
    },
    player3: {
        type:String,
        required: true
    },
    player4: {
        type:String,
        required: true
    },
    player5: {
        type:String,
        required: true
    },
    player6: {
        type:String,
        required: true
    },
    player7: {
        type:String,
        required: true
    },
    player8: {
        type:String,
        required: true
    },
    player9: {
        type:String,
        required: true
    },
    player10: {
        type:String,
        required: true
    },
    player11: {
        type:String,
        required: true
    },
})

module.exports = mongoose.model("team", teamSchema)