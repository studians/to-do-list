import React from 'react'
import { withRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import TodoTemplateBlock from '../TodoTemplate/TodoTemplate'
import TodoHead from '../TodoHeader/TodoHeader'
import TodoList from '../TodoList/TodoList'

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function TodoPage() {
    return (
        <>
            <GlobalStyle />
            <TodoTemplateBlock>
              <TodoHead />
              <TodoList />
            </TodoTemplateBlock>
        </>
    )
}

export default withRouter(TodoPage)