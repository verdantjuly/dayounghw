const express = require('express');
const connect = require('./modules');
const indexRouter = require('./routes');

const app = express();
const port = 3000;

connect();

app.use(express.json())

app.use("", indexRouter)

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!")
})

// 쿠키
app.get('/set-cookie', (req, res) => {
    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 60)
    // 만료 시간을 60분으로 설정

    res.cookie('name', 'sparta', {
        expires: expire
    })
    return res.status(200).end()
})

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/get-cookie', (req, res) => {
    const cookie = req.cookies;
    return res.status(200).json({ cookie })
})

//세션
let session = {}
app.get('/set-session', function (req, res, next) {
    const name = 'sparta'
    const uniqueInt = Date.now()
    session[uniqueInt] = { name };

    res.cookie('sessionKey', uniqueInt)
    return res.status(200).end()
})
app.get('/get-session', function (req, res, next) {
    const { sessionKey } = req.cookies;
    const name = session[sessionKey];
    return res.status(200).json({ name });
})