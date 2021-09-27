const express = require('express') //다운받았던 express 모듈을 가져온다
const app = express() //express 펑션을 이용하여 새로운 express app을 생성한다
const port = 3000 //백서버의 port
const { User } = require("./models/User");//user.js를 가져옴

const conifg = require('./config/key');

//bodyParser의 옵션을 줌. 2021.09.22 요즘은 express 업데이트한 후 바디 파서를 더이상 가져오지 않아도 됨
//1. bodyParser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌
// ex) application/x-www-form-urlendcoded
app.use(express.urlencoded({extended: true}));

//2.application/json 타입으로 된 데이터를 분석해서 가져올 수 있게 해줌
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(conifg.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true //에러를 발생 방지
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { //루트디렉토리에 오면
  res.send('Hello World!~~안녕하세요~')   //Hello World를 출력한다
})

app.post('/register', (req, res) => { //콜백펑션: req, res

  //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 db에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {//정보들이 유저모델에 저장이 됨
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })//status 200: 성공했다는 뜻
  }) 
})

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