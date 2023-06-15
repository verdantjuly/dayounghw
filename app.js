const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes');
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');

const connect = require('./schemas');
connect();

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!")
})

app.use(express.json())
app.use("", [indexRouter, postsRouter, commentsRouter])


app.get('/', (req, res) => {
    res.send("방문해 주셔서 감사합니다. /posts /commemnts 를 통해 각 카테고리로 이동할 수 있습니다. ");
});


