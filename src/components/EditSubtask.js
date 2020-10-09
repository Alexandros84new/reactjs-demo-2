import React from 'react';
import { Icon } from "react-icons-kit";
import { plusOutline } from 'react-icons-kit/typicons/plusOutline'
import { minusOutline } from 'react-icons-kit/typicons/minusOutline'
import { check } from 'react-icons-kit/oct/check'

export const EditSubtask = ({ dispatch, subtaskIndex, todo, todoIndex, subtask }) => {

	const setSubtaskText = (event) => {
		let text = event.target.value;
		dispatch({type: 'edit_subtask', payload: {text, subtaskIndex, todoIndex }});
	}

	const handleRemoveSubtask = (event) => {
		event.preventDefault();
		event.stopPropagation();
		console.log('remove');
		dispatch({ type: 'remove_subtask', payload: { subtaskIndex, todoIndex, length: todo.subtasks.length }});
	}

	const handleAddSubtask = (event) => {
		event.stopPropagation();
		event.preventDefault();
		console.log('add');
		dispatch({ type: 'add_subtask', payload: { subtaskIndex, todoIndex, length: todo.subtasks.length }});
	}

	return (
		<div className={'d-flex flex-row'}>
			<form>
				<input type="text" placeholder={'New subtask'} onChange={event => setSubtaskText(event)} value={subtask.text} />
			</form>
			{todo.subtasks.length === 1 ?
				null
				:
				<div onClick={(event) => handleRemoveSubtask(event)}>
					<Icon size={22} icon={minusOutline} />
				</div>
			}
			<div onClick={(event) => handleAddSubtask(event)}>
				<Icon size={22} icon={plusOutline} />
			</div>
			<div className={'d-inline mr-1'}
					 style={{ color: subtask.status ? 'green' : 'red' }}>
				<Icon size={20} icon={check} />
			</div>
		</div>
	);
}