import React from 'react';
import { Icon } from "react-icons-kit";
import { check } from 'react-icons-kit/oct/check'

export const Subtask = ({ index, todo, subtask, dispatch }) => {
	return (
		<li key={index}
							className={'subtasks-handler m-1'}
							onClick={() => dispatch({ type: 'toggle_subtask', payload: todo, subtask })}>
		{index + 1}. {subtask.status ? <span>{subtask.text}</span> : <del>{subtask.text}</del>}
		<div className={'d-inline mr-1'}
				 style={{ color: subtask.status ? 'green' : 'red' }}>
			<Icon size={12} icon={check} />
		</div>
	</li>)
}