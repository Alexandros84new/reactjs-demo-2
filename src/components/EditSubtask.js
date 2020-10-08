import React from 'react';
import { Icon } from "react-icons-kit";
import { plusOutline } from 'react-icons-kit/typicons/plusOutline'
import { minusOutline } from 'react-icons-kit/typicons/minusOutline'

export const EditSubtask = ({ dispatch, subtaskIndex, todo, todoIndex, subtask }) => {

	const setSubtaskText = (event) => {
		let text = event.target.value;
		dispatch({type: 'edit_subtask', payload: {text, subtaskIndex, todoIndex }});
	}

	return (
		<div className={'d-flex flex-row'}>
			<form>
				<input type="text" placeholder={'New subtask'} onChange={event => setSubtaskText(event)} value={subtask.text} />
			</form>
			{todo.subtasks.length === 1 ?
				null
				:
				<div onClick={() => dispatch({ type: 'remove_subtask', payload: { subtaskIndex, todoIndex }})}>
					<Icon size={22} icon={minusOutline} />
				</div>
			}
			<div onClick={() => dispatch({ type: 'add_subtask', payload: { subtaskIndex, todoIndex }})}>
				<Icon size={22} icon={plusOutline} />
			</div>
		</div>
	);
}