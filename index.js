const express = require('express') //다운받았던 express 모듈을 가져온다
const app = express() //express 펑션을 이용하여 새로운 express app을 생성한다
const port = 3000 //백서버의 port

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://iceChoco:abc1234@todolist.hunw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true //에러를 발생 방지
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { //루트디렉토리에 오면
  res.send('Hello World!~~안녕하세요~')   //Hello World를 출력한다
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