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
        return res.status(200).json({ "posts": allComments })
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
    } else if (user == Comments.find({ "user": user })) {
        return res.status(400).json({
            success: false,
            errorMessage: "동일한 작성 ID가 존재합니다. 잠시 후에 다시 작성해 주세요."
        })
    } else if (content) {
        await Comments.create({ user, password, content, date, postid })
        return res.status(201).json({ "message": "댓글이 작성되었습니다. 고객님의 사용자 이름은 " + user + "입니다." })
    }

})


// 댓글 수정하기
router.put("/comments/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password, content } = req.body
    var date = new Date()
    date = date.toString()

    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "수정할 댓글 내용을 입력해주세요."
        })
    } else if (user == Comments.find({ "user": user })) {
        return res.status(400).json({
            success: false,
            errorMessage: "동일한 작성 ID가 존재합니다. 잠시 후에 다시 작성해 주세요."
        })
    } else if (content) {
        await Comments.updateOne({ user, password, content, date, postid })
        return res.status(201).json({ "message": "postid: " + postid + " 에 대한 " + user + "의 댓글이 수정되었습니다." })
    }

})


// 댓글 삭제하기

router.delete("/comments/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password } = req.body

    if (Comments.find({ "postid": postid, "user": user, "password": password })) {

        await Comments.deleteOne({ "user": user, "password": password })
        return res.status(200).json({
            "message": "postid: " + postid + " 에 대한 " + user + "의 댓글이 삭제되었습니다."
        })

    } else {
        return res.status(400).json({
            success: false,
            errorMessage: "오류가 발생되었습니다. 게시글이 삭제되지 않았습니다."
        })

    }

})


module.exports = router;