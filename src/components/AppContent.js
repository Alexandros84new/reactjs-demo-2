import React, { useContext, useState, useEffect } from 'react';
import { Articles } from './Articles';
import { Todo } from './Todo';
import './AppContent.css';
import {TodosContext} from "../contexts/TodosContext";

export const AppContent = () => {
    const { state } = useContext(TodosContext);
    return (
        <div className={'main'}>
            <ul className={'ul-style'}>
                {state.map((todo, todoIndex) => {
                    return (
                    <div>
                        <Todo todo={todo} todoIndex={todoIndex} />
                        <Articles todo={todo} />
                    </div>);
                })}
            </ul>
        </div>
    )
}