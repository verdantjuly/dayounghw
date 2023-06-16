const express = require('express');
const router = express.Router();
const Comments = require("../schemas/comment.js")

// 댓글 전체 조회하기
router.get("/comments/:postid", async (req, res) => {
    var { postid } = req.params
    const allComments = await Comments.find({ "postid": postid })
    allComments.sort(
        function (prev, next) {
            if (prev.date > next.date) { return -1 }
            else if (prev.date == next.date) { return 0 }
            else if (prev.date < next.date) { return 1 }
        }
    )
    if (!allComments.length) {
        return res.status(200).json({
            "message": "작성된 댓글이 없습니다. 첫 작성자가 되어 주세요!"
        })
    } else {
        return res.status(200).json({ "comments": allComments })
    }

})


// 댓글 작성하기 
router.post("/comments/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password, content } = req.body
    var date = new Date()

    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "작성할 댓글 내용을 입력해주세요."
        })
    } else {
        await Comments.create({ "user": user, "password": password, "content": content, "date": date, "postid": postid })
        return res.status(201).json({ "message": "댓글이 작성되었습니다. 고객님의 사용자 이름은 " + user + "입니다." })
    }

})


// 댓글 수정하기
router.put("/comments/:commentid", async (req, res) => {
    var { commentid } = req.params
    var { user, password, content } = req.body
    var date = new Date()
    var findComment = await Comments.findOne({ "_id": commentid, "user": user }).select("+password")


    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "수정할 댓글 내용을 입력해주세요."
        })
    } else if (findComment.password == password) {
        await Comments.updateOne({ "user": user, "password": password, "content": content, "date": date })
        return res.status(201).json({ "message": "_id: " + commentid + " 에 대한 " + user + "의 댓글이 수정되었습니다." })
    } else if (findComment.password !== password) {
        return res.status(400).json({
            success: false,
            errorMessage: "비밀번호가 일치하지 않습니다."
        })
    }
})



// 댓글 삭제하기

router.delete("/comments/:commentid", async (req, res) => {
    var { commentid } = req.params
    var { user, password } = req.body

    var findComment = await Comments.findOne({ "_id": commentid, "user": user, "password": password }).select("+password")

    if (findComment.password == password) {
        await Comments.deleteOne({ "_id": commentid, "user": user, "password": password })
        return res.status(200).json({
            "message": "_id: " + commentid + " 에 대한 " + user + "의 댓글이 삭제되었습니다."
        })

    } else if (findComment.password !== password) {
        return res.status(400).json({
            success: false,
            errorMessage: "비밀번호가 일치하지 않습니다."
        })
    }

})


module.exports = router;