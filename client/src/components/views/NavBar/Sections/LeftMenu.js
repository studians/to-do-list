import React from 'react'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'

function LeftMenu(props){
    const user = useSelector(state => state.user);//리덕스의 state를 조회한다.

    if(user.userData && user.userData.isAuth){//로그인 한 경우에만 자신의 TodoList 페이지에 들어갈 수 있다.
        return(
            <Menu mode = {props.mode}>
                <Menu.Item key="mail">
                    <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item key="todo">
                    <a href="/todo">To Do List</a>
                </Menu.Item>  
            </Menu>
        )
    }else{
        return(
            <Menu mode = {props.mode}>
                <Menu.Item key="mail">
                    <a href="/">Home</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default LeftMenu