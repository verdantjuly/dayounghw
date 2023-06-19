const express = require('express');
const router = express.Router();
const Comments = require("../modules/comment.js")
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types;


// 댓글 전체 조회하기
router.get("/:postid", async (req, res) => {
    var { postid } = req.params

    const allComments = await Comments.find({ postid }).sort({ updatedAt: -1 })

    if (!ObjectId.isValid(postid)) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    if (!allComments.length) {
        return res.status(200).json({
            "message": "작성된 댓글이 없습니다. 첫 작성자가 되어 주세요!"
        })
    } else {
        return res.status(200).json({ "comments": allComments })
    }

})


// 댓글 작성하기 
router.post("/:postid", async (req, res) => {
    var { postid } = req.params
    var { user, password, content } = req.body

    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "작성할 댓글 내용을 입력해주세요."
        })
    } else if (!ObjectId.isValid(postid) || !postid || !user || !password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
    else {
        await Comments.create({ user, password, content, postid })
        return res.status(201).json({ "message": "댓글이 작성되었습니다. 고객님의 사용자 이름은 " + user + "입니다." })
    }

})


// 댓글 수정하기
router.put("/:commentid", async (req, res) => {
    var { commentid } = req.params
    var { user, password, content } = req.body
    var findComment = await Comments.findOne({ "_id": commentid, user }).select("+password")


    if (!content) {
        return res.status(400).json({
            success: false,
            errorMessage: "수정할 댓글 내용을 입력해주세요."
        })
    } else if (findComment.password == password) {
        await Comments.findByIdAndUpdate(commentid, { content })
        return res.status(201).json({ "message": "_id: " + commentid + " 에 대한 " + user + "의 댓글이 수정되었습니다." })
    } else if (!ObjectId.isValid(id) || !password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }
})



// 댓글 삭제하기

router.delete("/:commentid", async (req, res) => {
    var { commentid } = req.params
    var { user, password } = req.body

    var findComment = await Comments.findOne({ "_id": commentid, user }).select("+password")

    if (!ObjectId.isValid(commentid) || !password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    if (findComment.password == password) {
        await Comments.findByIdAndDelete({ "_id": commentid })
        return res.status(200).json({
            "message": "_id: " + commentid + " 에 대한 " + user + "의 댓글이 삭제되었습니다."
        })

    }

})


module.exports = router;