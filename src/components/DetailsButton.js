import React from 'react';
import { Icon } from "react-icons-kit";
import { download } from 'react-icons-kit/oct/check'

export const DetailsButton = ({ todo, dispatch }) => {
	return (
		<div className="d-flex flex-column align-content-center status-handler li-style"
				 onClick={() => dispatch({ type: 'toggle_isOpen', payload: todo })}>
			<div className={'d-flex flex-row justify-content-center'}>
				{todo.isOpen ? <div>Less</div> : <div>More</div>}
			</div>
			<div className={'d-flex flex-row justify-content-center mt-1'}
					 style={{ color: todo.isOpen ? 'orange' : '#177C72' }}>
				<Icon size={30} icon={download} />
			</div>
		</div>)
}