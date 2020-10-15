import React, { useState } from 'react';
import { EditSubtask } from './EditSubtask';

export const Form = ({ state, todo, dispatch, todoIndex }) => {
	const setNewTodoText = (event) => {
		let text = event.target.value;
		dispatch({type: 'change_text', payload: { text, todoIndex }});
	}

	const addNewTodo = () => {
		let length = state.length;
		dispatch({type: 'add_todo', payload: { todoIndex, length }});
	}

	let editedTodo = state.find(todo => todo.id === todoIndex + 1);
	let isThisNewTodo = todoIndex === state.length - 1;

	return (<li key={state.length} className={`mt-3 ${todo.isEditOpen ? 'edit-open' : 'edit-closed'}`}>
		<div className={'d-flex flex-column justify-content-start align-content-center'}>
			<div className={'d-flex flex-row justify-content-end align-content-end mb-3 subtasks-handler'}>
				<div
				     onClick={() => dispatch({type: 'change_isEditOpen', payload: { todoIndex }})}>
					{isThisNewTodo ? <span>Edit new Todo</span> : <span>Edit Content</span>}
				</div>
			</div>
			<div>
				<div>
					<form>
						<input type="text" placeholder={'New title'} value={editedTodo.text} onChange={event => setNewTodoText(event)} />
					</form>
				</div>
				{editedTodo.subtasks.map((st, subtaskIndex) => {
					return (
						<div>
							<EditSubtask
								dispatch={dispatch}
								todo={todo}
								todoIndex={todoIndex}
								subtaskIndex={subtaskIndex}
								subtask={st}
							/>
						</div>
					);
				})
				}
			</div>
			{isThisNewTodo ?
				<button className={'add-new-todo'} onClick={addNewTodo}>Add this to list</button>
				:
				null
			}
		</div>
	</li>)
}