import {
    LOGIN_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            console.log("로그인 성공!");
            return { ...state, loginSuccess: action.payload }//user_action.js에서 셋팅 된 payload를 리듀서의 loginSuceess에 넣어줌
        default:
            return state;
    }
}