import React, { useContext, useState } from 'react';
import { TodosContext } from "../contexts/TodosContext";
import { Icon } from 'react-icons-kit';
import { Subtask } from './Subtask';
import { download } from 'react-icons-kit/iconic/download';
import './AppContent.css';

export const AppContent = () => {
    const { state, dispatch } = useContext(TodosContext);
    const [todoValue, setTodoValue] = useState('');

    const setNewTodoValue = (event) => {
        let value = event.target.value;
        setTodoValue(value);
    }

    return (
        <div className={'main'}>
            <ul className={'ul-style'}>
                {state.map(todo => {
                    return (
                    <li key={todo.id} className={'d-flex flex-row justify-content-between align-content-center li-style m-2 p-4'}>
                        <div className="flex-column">
                            {todo.status ? <span><u>{todo.text}</u></span> : <del>{todo.text}</del>}
                            <div className={'status-handler'} onClick={() => dispatch({ type: 'toggle', payload: todo })}>
                                {todo.status ?
                                  <span>Set this as Done</span> : <span>Set as to Do</span>}
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
                            <div className="d-flex flex-column align-content-center status-handler li-style"
                                 onClick={() => dispatch({ type: 'toggle_isOpen', payload: todo })}>
                                <div className={'d-flex flex-row justify-content-center'}>
                                    {todo.isOpen ? <div>Hide details</div> : <div>Show details</div>}
                                </div>
                                <div className={'d-flex flex-row justify-content-center mt-1'}
                                     style={{ color: todo.isOpen ? 'orange' : '#177C72' }}>
                                    <Icon size={30} icon={download} />
                                </div>
                            </div>
                            <div className={'subtasks-parent'}>
                                <div className={`subtasks ${todo.isOpen ? 'test-open' : 'test-closed' }`}
                                     style={{ 'border': todo.isOpen ? '1px solid orange' : '1px solid #177C72'}}>
                                    <div className={'subtasks-handler d-flex flex-row-reverse m-1'}>
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
                    </li>);
                })}
                <li key={state.length} className={'li-style m-2 p-4'}>
                    <div className={'d-flex flex-row justify-content-start align-content-end'}>
                        <div className={'border-1 border-secondary'}>
                            <span>Add Todo</span>
                            <form>
                                <input type="text" onChange={event => setNewTodoValue(event)} value={todoValue} />
                            </form>
                        </div>
                        <div className={'border-1 border-secondary'}>
                            <span
                              onClick={() => {
                                  dispatch({ type: 'add', payload: { text: todoValue }})
                                  setTodoValue('');                          }}
                              className="ml-4">Put this on my list
                        </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}