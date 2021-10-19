import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
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

export function registerUser(dataToSubmit) {
    //axios 내에 있는 post라는 http 메소드를 이용
    const request = axios.post('/api/users/register ', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request //request: 백엔드에서 가져온 모든 데이터
    }
}

export function auth() {
    //axios 내에 있는 get라는 http 메소드를 이용
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request //request: 백엔드에서 가져온 모든 데이터
    }
}