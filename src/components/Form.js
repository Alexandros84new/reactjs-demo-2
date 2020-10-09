import React, { useState } from 'react';
import { EditSubtask } from './EditSubtask';

export const Form = ({ state, todo, dispatch, todoIndex }) => {
	const [text, setText] = useState('');

	const setNewTodoText = (event) => {
		let text = event.target.value;
		dispatch({type: 'change_text', payload: { text, todoIndex }});
	}

	let editedTodo = state.find(todo => todo.id === todoIndex + 1);
	let isThisNewTodo = todoIndex === state.length - 1

	return (<li key={state.length} className={`li-style mt-3 ${todo.isEditOpen ? 'edit-open' : 'edit-closed'}`}>
		<div className={'d-flex flex-column justify-content-start align-content-center'}>
			<div className={'d-flex flex-row justify-content-center align-content-end'}>
				<div className={'border-1 border-secondary mb-1'}
				     onClick={() => dispatch({type: 'change_isEditOpen', payload: { todoIndex }})}
				     style={{ cursor: 'pointer' }}>
					{isThisNewTodo ? <span>Add new Todo:</span> : <span>Edit Content:</span>}
				</div>
			</div>
			<div>
				<div>
					<form>
						<input type="text" value={editedTodo.text} onChange={event => setNewTodoText(event)} />
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
		</div>
	</li>)
}