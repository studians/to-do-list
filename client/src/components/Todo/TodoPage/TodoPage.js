import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md'

import TodoTemplateBlock from '../TodoTemplate/TodoTemplate'
import TodoHead from '../TodoHeader/TodoHeader'
import TodoList from '../TodoList/TodoList'
import TodoPop from '../TodoPop/TodoPop'

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const CircleButton = styled.div`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active{
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;

    transition: 0.125s all ease-in;
`
function TodoPage() {
  //TodoList 데이터 배열 - 추후 DB에서 조회해 온 값으로 변경 필요
  const [todos, setTodos] = useState([
    { title: "네이버 블로그", text: "요거프레소 용인메디컬센터점 포스팅하기", done: true },
    { title: "React", text: "React ToDoList 만들기", done: false }
  ])

  const [btnPopup, setBtnPopup] = useState(false);//버튼클릭YN

  return (
    <>
      <GlobalStyle />
      <TodoTemplateBlock>
        <TodoHead />
        <TodoList todos={todos} />
        <CircleButton onClick={() => setBtnPopup(true)}>
          <MdAdd />
        </CircleButton>
        <TodoPop trigger={btnPopup} setTrigger={setBtnPopup} />
      </TodoTemplateBlock>
    </>
  )
}

export default withRouter(TodoPage)