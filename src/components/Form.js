import React, { useState } from 'react';

export const Form = ({ length, dispatch }) => {
	const [title, setTitle] = useState('');
	const [kind, setKind] = useState('work');

	const setNewTodoTitle = (event) => {
		let value = event.target.value;
		setTitle(value);
	}

	const handleSelect = (event) => {
		let value = event.target.value;
		// console.log('value', value);
		setKind(value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
	}

	return (<li key={length} className={'li-style m-2 p-4'}>
		<div className={'d-flex flex-row justify-content-start align-content-end'}>
			<div className={'border-1 border-secondary'}>
				<span>Add Todo Title</span>
				<form>
					<input type="text" onChange={event => setNewTodoTitle(event)} value={title} />
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
					<input type="submit" value="Submit" onSubmit={handleSubmit} />
				</form>
			</div>
			<div className={'border-1 border-secondary'}>
				<span
					onClick={() => {
						dispatch({ type: 'add_todo', payload: { text: title, kind: 'work' }})
						setTitle('');                          }}
					className="ml-4">Put this on my list
				</span>
			</div>
		</div>
	</li>)
}