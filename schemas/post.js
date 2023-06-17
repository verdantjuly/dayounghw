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
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
)


module.exports = mongoose.model("Posts", postScheama)