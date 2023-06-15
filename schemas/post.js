const mongoose = require("mongoose")

const postScheama = new mongoose.Schema({
    user: {
        type: String,

    },
    password: {
        type: String,
        select: false
    },
    title: {
        type: String,

    },
    content: {
        type: String,
    },
    __v: {
        type: Number,
        select: false
    },
    date: {
        type: Date,


    }
})


module.exports = mongoose.model("Posts", postScheama)