import React from 'react';
import styled from 'styled-components';
import '../Todo.css';

const TodoHeadBlock = styled.div`
padding-top: 48px;
padding-left: 32px;
padding-right: 32px;
padding-bottom: 24px;
border-bottom: 1px solid #e9ecef;
h1{
    margin: 0;
    font-size: 36px;
    color: #343a40;
}
`

function TodoHead(){
    return(
        <TodoHeadBlock>
            <h1>2021-10-16</h1>
            <div className="day">토요일</div>
            <div className="tasks-left">할 일 2개 남음</div>
        </TodoHeadBlock>
    )
}

export default TodoHead;