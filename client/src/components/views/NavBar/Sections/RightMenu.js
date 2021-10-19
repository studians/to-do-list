import React from 'react'
import { Menu } from 'antd'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function RightMenu(props){
    const user = useSelector(state => state.user);//리덕스의 state를 조회한다.

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response =>{
                if(response.data.success){
                    props.history.push("/login") //history는 react-router-dom을 이용하여 쓰는 것
                }else{
                    alert('로그아웃 하는데 실패했습니다.')
                }
            })
    }

    if(user.userData && !user.userData.isAuth){//로그인 하지 않은 경우
        return(
            <Menu mode = {props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">SignIn</a>
                </Menu.Item>   
                <Menu.Item key="app">
                    <a href="/register">SignUp</a>
                </Menu.Item>   
            </Menu>
        )
    }else{//로그인 한 경우
        return(
            <Menu mode = {props.mode}>
                <Menu.Item key="logout">
                    <a onClick={onClickHandler}>Logout</a>
                </Menu.Item>   
            </Menu>
        )
    }
}

export default withRouter(RightMenu);