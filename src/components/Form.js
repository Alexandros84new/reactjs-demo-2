import React, { useState } from 'react';
import { EditSubtask } from './EditSubtask';

export const Form = ({ state, todo, dispatch, todoIndex }) => {
	const [text, setText] = useState('');
	const [kind, setKind] = useState('work');

	const setNewTodoText = (event) => {
		let value = event.target.value;
		setText(value);
	}

	const handleSelect = (event) => {
		let value = event.target.value;
		// console.log('value', value);
		setKind(value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	let editedTodo = state.find(todo => todo.id === todoIndex + 1);
	let isThisNewTodo = todoIndex === state.length - 1

	return (<li key={state.length} className={'li-style m-2 p-4'}>
		<div className={'d-flex flex-row justify-content-start align-content-end'}>
			<div className={'border-1 border-secondary'}>
				{isThisNewTodo ? <span>Add new Todo:</span> : <span>Edit this Todo:</span>}
				<form>
					<input type="text" onChange={event => setNewTodoText(event)} value={text} />
				</form>
			</div>
			<div className={'border-1 border-secondary'}>
				<span>Select kind</span>
				<form>
					<select id="kind" name="kind" onChange={event => handleSelect(event)}>
						<option value="work">Work</option>
						<option value="chores">Chores</option>
						<option value="leisure">Leisure</option>
					</select>
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
				</form>
			</div>
			<div className={'border-1 border-secondary'}>
				<span
					onClick={() => {
						dispatch({ type: 'add_todo', payload: { text, kind }})
						setText('');                          }}
					className="ml-4">Put this on my list
				</span>
			</div>
		</div>
	</li>)
}