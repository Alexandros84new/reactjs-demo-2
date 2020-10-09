import React, { useContext, useState } from 'react';
import { TodosContext } from "../contexts/TodosContext";
import { Icon } from 'react-icons-kit';
import { Subtask } from './Subtask';
import { Form } from './Form';
import { download } from 'react-icons-kit/iconic/download';
// leisure icon
import { telescope } from 'react-icons-kit/oct/telescope'
// work icon
import { tools } from 'react-icons-kit/oct/tools'
// chores icon
import { signIn } from 'react-icons-kit/oct/signIn'
import './AppContent.css';

export const AppContent = () => {
    const { state, dispatch } = useContext(TodosContext);

    const determineKindIcon = (kind) => {
        switch (kind) {
            case 'chores':
                return signIn;
            case 'work':
                return tools;
            case 'leisure':
                return telescope;
            default:
                throw new Error();
        }
    }

    return (
        <div className={'main'}>
            <ul className={'ul-style'}>
                {state.map((todo, todoIndex) => {
                    return (
                    <li key={todo.id} className={'d-flex flex-column justify-content-between align-content-start li-style m-2 p-4'}>
                        <div className="d-flex flex-row justify-content-between align-content-start">
                            <div className="d-flex flex-column justify-content-between align-content-start">
                                <div className={'d-flex flex-row align-content-end'}>
                                    <div className="p-2 border border-secondary rounded-circle"
                                         style={{ color: todo.status ? 'orange' : 'grey' }}>
                                        <Icon size={30} icon={determineKindIcon(todo.kind)} />
                                    </div>
                                    <div className="pt-3 pl-1">
                                        {todo.status ? <span><u>{todo.text}</u></span> : <del>{todo.text}</del>}
                                    </div>
                                </div>
                                <div>
                                    <div className={'status-handler mt-2'} onClick={() => dispatch({ type: 'toggle', payload: todo })}>
                                        {todo.status ?
                                          <span>Set this as Done</span> : <span>Set as to Do</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="li-style width-details p-2 d-flex flex-column justify-content-between align-content-start"
                                 style={{ 'border': todo.isOpen ? '1px solid orange' : '1px solid #177C72'}}>
                                <button
                                  type="button"
                                  className={'remove border border-dark rounded close ml-4'}
                                  onClick={() => dispatch({ type: 'remove', payload: todo })}
                                  aria-label="Close">
                                    <span aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                                <div className="d-flex flex-column align-content-center status-handler li-style">
                                    <div className={'d-flex flex-row justify-content-center'}>
                                        {todo.isOpen ? <div>Less</div> : <div>More</div>}
                                    </div>
                                </div>
                                <div className={'subtasks-parent'}>
                                    <div className={`subtasks ${todo.isOpen ? 'test-open' : 'test-closed' }`}
                                         style={{ 'border': todo.isOpen ? '1px solid orange' : '1px solid #177C72'}}>
                                        <div className={'subtasks-handler d-flex flex-row-reverse m-1'}
                                             onClick={() => dispatch({ type: 'toggle_isOpen', payload: todo })}>
                                            <span><u>Subtasks</u></span>
                                        </div>
                                        <ul className={'ul-style m-1'}>
                                        {todo.subtasks.map((subtask, index) => {
                                        return <Subtask index={index} subtask={subtask} dispatch={dispatch} todo={todo} />
                                            })
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Form state={state} todo={todo} dispatch={dispatch} todoIndex={todoIndex} />
                    </li>);
                })}
            </ul>
        </div>
    )
}