import React from 'react'
import styled, { css } from 'styled-components'
import { MdDone, MdDelete, MdPanoramaPhotosphereSelect } from 'react-icons/md'

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover { /* &: Component Selector - TodoItemBlock 위에 커서가 있을 때, */
      ${Remove}{ /* remove라는 컴포넌트의 값을 보여준다.*/
        display: initial;
      }
  }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props => props.done && css`
        border: 1px solid #38d9a9;
        color: #38d9a9;
    `}
`;

const Title = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    font-weight: bold;
    ${props => props.done && css`
        color: #ced4da;
    `}
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props => props.done && css`
        color: #ced4da;
    `}
`;

function TodoItem({ title, done, text }) {

    return (
        <TodoItemBlock className='to-do-item'>
            <CheckCircle done={done}>
                {done && <MdDone />}
            </CheckCircle>
            <div>
                <Title done={done}>{title}</Title>
                <Text done={done}>{text}</Text>
            </div>
            <Remove>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    )
}

export default TodoItem;