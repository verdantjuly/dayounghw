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

    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("Comments", commentScheama)