import React from 'react'

function TodoItem({id, done, text}){
    return(
        <TodoItemBlock>
            <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
        </TodoItemBlock>
    )
}