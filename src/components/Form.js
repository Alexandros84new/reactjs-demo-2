import React, { useState } from 'react';
import { EditSubtask } from './EditSubtask';

export const Form = ({ state, todo, dispatch, todoIndex }) => {
	const [text, setText] = useState('');

	const setNewTodoText = (event) => {
		let text = event.target.value;
		dispatch({type: 'change_text', payload: { text, todoIndex }});
	}

	const handleSelect = (event) => {
		let kind = event.target.value;
		// console.log('value', value);
		dispatch({type: 'change_kind', payload: { kind, todoIndex }});
	}

	let editedTodo = state.find(todo => todo.id === todoIndex + 1);
	let isThisNewTodo = todoIndex === state.length - 1

	return (<li key={state.length} className={`li-style mt-3 ${todo.isEditOpen ? 'edit-open' : 'edit-closed'}`}>
		<div className={'d-flex flex-column justify-content-start align-content-end'}>
			<div className={'d-flex flex-row justify-content-start align-content-end'}>
				<div className={'border-1 border-secondary mb-1'}
				     onClick={() => dispatch({type: 'change_isEditOpen', payload: { todoIndex }})}
				     style={{ cursor: 'pointer' }}>
					{isThisNewTodo ? <span>Add new Todo:</span> : <span>Edit this Todo:</span>}
					<form>
						<input type="text" value={editedTodo.text} onChange={event => setNewTodoText(event)} />
					</form>
				</div>
				<div className={'border-1 border-secondary'}>
					<form>
						<select id="kind" name="kind" value={editedTodo.kind} onChange={event => handleSelect(event)}>
							<option value="work">Work</option>
							<option value="chores">Chores</option>
							<option value="leisure">Leisure</option>
						</select>
					</form>
				</div>
			</div>
			<div>
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