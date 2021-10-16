import React, { useEffect } from 'react'
import axios from 'axios';
//import { response } from 'express';

export default function LandingPage() { //랜딩페이지에 들어오자마자

    useEffect(() => {//실행한다.
        axios.get('/api/hello')//서버의 /api/hello 엔드 포인트에 get req를 보낸다.
            .then(response => console.log(response.data))//보낸 다음 서버에서 돌아오는 res.를 콘솔창에 보여준다.
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
        </div>
    )
}
