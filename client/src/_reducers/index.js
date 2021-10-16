import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({ //combineReducers를 이용하여 rootReducer로 합침
    user
})

export default rootReducer; //다른 파일에서 리듀서를 쓸 수 있도록 익스포트
