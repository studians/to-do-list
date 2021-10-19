import React from 'react';
import '../Todo.css';
import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todos }) {

    const todoList = todos.map(
        ({ title, text, done }) => (
            <TodoItem
                title={title}
                text={text}
                done={done}
            />
        )
    );

    return (
        <div className='to-do-list'>
            {todoList}
        </div>
    )
}

export default TodoList;