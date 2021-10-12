import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

//react store는 객체타입만 받을 수 있기 때문에 promise, function 타입의 데이터를 받기 위해서는 
//아래와 같이 redux 모듈 안에 들어있는 applyMiddleware를 사용하여 redux-promise와 redux-thunk를 설정해줘야한다.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENISON__ && //Redux 확장 프로그램인 DevTools extension을 연결. 이 tool을 이용하면 Redux를 편하게 사용할 수 있음. 크롬에서 다운 해줘야 작동함.
      window.__REDUX_DEVTOOLS_EXTENISON__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root')//public - indext.html 파일 안에 root라는 이름의 element가 있다. 이 곳에다가 App.js를 보여주겠다라는 의미임
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
