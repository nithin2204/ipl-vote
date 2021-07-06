const mongoose = require("mongoose")

const voterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    votes: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("voter", voterSchema)