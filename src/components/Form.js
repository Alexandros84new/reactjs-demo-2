import React, { useState } from 'react';
import { EditSubtask } from './EditSubtask';
import { Icon } from 'react-icons-kit';
import { plusOutline } from 'react-icons-kit/typicons/plusOutline'

export const Form = ({ state, dispatch }) => {
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

	let editedTodo = state.find(todo => todo.id === state.length);

	return (<li key={state.length} className={'li-style m-2 p-4'}>
		<div className={'d-flex flex-row justify-content-start align-content-end'}>
			<div className={'border-1 border-secondary'}>
				<span>Add Todo Text</span>
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
					{editedTodo.subtasks.map((st, index) => {
						return (
							<EditSubtask dispatch={dispatch} index={index} subtask={st} />
						);
					})
					}
					<div onClick={() => dispatch({ type: 'add_subtask'})}>
						<Icon size={22} icon={plusOutline} />
					</div>
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