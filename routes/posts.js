const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post.js")

// 게시글 전체 불러오기
router.get("/posts", async (req, res) => {

    const allPosts = await Posts.find()
    allPosts.sort(
        function (prev, next) {
            if (prev.date > next.date) { return -1 }
            else if (prev.date == next.date) { return 0 }
            else if (prev.date < next.date) { return 1 }
        }
    )
    if (!allPosts.length) {
        return res.status(200).json({
            "message": "작성된 게시글이 없습니다. 첫 작성자가 되어 주세요!"
        })
    } else {
        return res.status(200).json({ "posts": allPosts })

    }

})

// 게시글 1개 불러오기
router.get("/posts/:postid", async (req, res) => {
    const { postid } = req.params
    const selectPost = await Posts.find({ "_id": postid })
    if (selectPost) {
        return res.status(200).json({ "Selected Post by postid": selectPost })
    }

})


// 게시글 작성하기 
router.post("/posts", async (req, res) => {


    var { user, password, title, content } = req.body

    if (user, password, title, content) {
        var date = new Date()

        await Posts.create({ user, password, title, content, date })
        return res.status(201).json({ "message": "게시글이 작성되었습니다." })

    }
})

// 게시글 수정하기
router.put("/posts/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password, title, content } = req.body
    const existPost = await Posts.findOne({ "_id": postid, "user": user, "password": password }).select("+password")

    if (password == existPost.password) {
        var date = new Date()
        await Posts.updateOne({ user, password, title, content, date })
        return res.status(200).json({
            "message": "게시글 " + postid + "가 수정되었습니다."
        })
    }

    else if (password !== existPost.password) {
        return res.status(400).json({
            success: false,
            errorMessage: "비밀번호가 일치하지 않습니다."
        })
    }
})

// 게시글 삭제하기
router.delete("/posts/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password } = req.body
    const existPost = await Posts.findOne({ "_id": postid, "user": user, "password": password }).select("+password")

    if (password == existPost.password) {
        await Posts.deleteOne({ "_id": postid, "user": user, "password": password })
        return res.status(200).json({
            "message": "게시글 " + postid + "가 삭제되었습니다."
        })
    }

    else if (password !== existPost.password) {
        return res.status(400).json({
            success: false,
            errorMessage: "비밀번호가 일치하지 않습니다."
        })
    }
})

module.exports = router;