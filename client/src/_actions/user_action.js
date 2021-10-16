import axios from "axios";
import {
    LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
    //axios 내에 있는 post라는 http 메소드를 이용
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request //request: 백엔드에서 가져온 모든 데이터
    }
}