const mongoose = require("mongoose")

const commentScheama = new mongoose.Schema({
    user: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        select: false,
        required: true
    },

    content: {
        type: String
    },

    __v: {
        type: Number,
        select: false
    },

    date: {
        type: Date,
    },

    postid: {
        type: String,
    }
})

module.exports = mongoose.model("Comments", commentScheama)