const mongoose = require("mongoose")

const commentScheama = new mongoose.Schema({
    user: {
        type: String
    },

    password: {
        type: String,
        select: false,

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