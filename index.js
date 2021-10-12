const express = require('express') //다운받았던 express 모듈을 가져온다
const app = express() //express 펑션을 이용하여 새로운 express app을 생성한다
const cookieParser = require('cookie-parser')
const conifg = require('./server/config/key');

const { auth } = require("./server/middleware/auth");//middleware폴더의 auth.js를 가져옴
const { User } = require("./server/models/User");//user.js를 가져옴


//bodyParser의 옵션을 줌. 2021.09.22 요즘은 express 업데이트한 후 바디 파서를 더이상 가져오지 않아도 됨
//1. bodyParser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌
// ex) application/x-www-form-urlendcoded
app.use(express.urlencoded({ extended: true }));

//2.application/json 타입으로 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(conifg.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true //에러를 발생 방지
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { //루트디렉토리에 오면
  res.send('Hello World!~~안녕하세요~')   //Hello World를 출력한다
})

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요 저 프론트엔드인데요")
})

app.post('/api/users/register', (req, res) => { //콜백펑션: req, res

  //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 db에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {//정보들이 유저모델에 저장이 됨
    if (err)
      return res.json({ success: false, err })

    return res.status(200).json({
      success: true
    })//status 200: 성공했다는 뜻
  })
})

app.post('/api/users/login', (req, res) => {
  //1. 요청된 e-mail을 DB에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //2. 요청된 e-mail이 DB에 있다면 PW가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      //3. 비밀번호까지 맞다면 토큰을 생성함.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); //status가 400 => 에러가 있다는 뜻

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등 여러군데에 저장할 수 있음
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true인 경우임
  req.status(200).json({
    _id: req.user._Id, //auth.js에서 user는 req.user로 넣어줬기 때문에 가능
    isAdmin: req.user.role == 0 ? false : true, //role이 0이면 일반유저, 0이 아니면 admin
    iSAuth: true,
    email: require.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  //유저를 찾아서 데이터를 업데이트해줌
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" } //토큰을 지워줌
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})
const port = 5000 //백서버의 port
app.listen(port, () => { //이 앱이 5천번 포트에서 listen하면
  console.log(`Example app listening at http://localhost:${port}`) //이 콘솔이 수행된다
})

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();