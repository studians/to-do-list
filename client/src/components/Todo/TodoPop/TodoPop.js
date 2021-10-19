import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import '../Todo.css';

function TodoPop(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                My popup
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    close
                </button>
            </div>
        </div>
    ) : "";
}

export default withRouter(TodoPop)
