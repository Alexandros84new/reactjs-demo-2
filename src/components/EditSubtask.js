import React from 'react';

export const EditSubtask = ({ dispatch, index, subtask }) => {

	const setSubtaskText = (event) => {
		let value = event.target.value;
		dispatch({type: 'edit_subtask', payload: {text: value, index: index}});
	}

	return (
		<form>
			<input type="text" placeholder={'New subtask'} onChange={event => setSubtaskText(event)} value={subtask.text} />
		</form>
	);
}