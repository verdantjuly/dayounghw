const express = require('express');
const connect = require('./schemas');
const indexRouter = require('./routes');

const app = express();
const port = 3000;

connect();

app.use(express.json())

app.use("", indexRouter)

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!")
})





