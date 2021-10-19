import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
/*
1. SpecificComponent: 감쌀 컴포넌트
2. option
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입이 가능한 페이지
    false => 로그인한 유저는 출입이 불가능한 페이지
3. adminRotue
    ture => 어드민 유저만 들어갈 수 있는 페이지
*/
export default function (SpecificComponent, option, adminRotue = null){

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {
                //console.log(response.payload)
                
                //로그인 하지 않은 상태인데
                if(!response.payload.isAuth){
                    if(option){//로그인한 유저만 출입이 가능한 페이지로 가려는 경우
                        props.history.push('/login')//로그인 페이지로 밀어내버림
                    }
                }else{
                    //로그인한 상태지만 Admin 유저가 아닐 떄
                    if(adminRotue && !response.payload.isAdmin){
                        props.history.push('/')
                    }else if(option === false){//로그인한 유저가 출입 불가능한 페이지에 가려고 하는 경우
                        props.history.push('/')
                    }
                }

            })
        }, [])

        return(
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}