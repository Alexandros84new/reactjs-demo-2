import React, { useContext } from 'react';
import { TodosContext } from "../contexts/TodosContext";
import { Icon } from 'react-icons-kit';
import { Subtask } from './Subtask';
import { Form } from './Form';
// leisure icon
import { telescope } from 'react-icons-kit/oct/telescope'
// work icon
import { tools } from 'react-icons-kit/oct/tools'
// chores icon
import { signIn } from 'react-icons-kit/oct/signIn'

export const Todo = ({ todo, todoIndex }) => {
	const { state, dispatch } = useContext(TodosContext);

	const determineKindIcon = (kind) => {
		switch (kind) {
			case 'chores':
				return signIn;
			case 'work':
				return tools;
			case 'leisure':
				return telescope;
			default:
				throw new Error();
		}
	}

	const handleSelect = (event, todoIndex) => {
		let kind = event.target.value;
		// console.log('value', value);
		dispatch({type: 'change_kind', payload: { kind, todoIndex }});
	}

	let isThisNewTodo = todoIndex === state.length - 1;

	return (
		<li key={todo.id} className={'d-flex flex-column justify-content-between align-content-start li-style m-2 p-4'}>
			<div className="d-flex flex-row justify-content-between align-content-start">
				<div className="d-flex flex-column justify-content-between align-content-start">
					<div className={'d-flex flex-row align-content-start'}>
						<div className="p-2 border border-secondary rounded-circle"
								 style={{ color: todo.status ? 'orange' : 'grey' }}
								 onClick={() => dispatch({ type: 'toggle', payload: todo })}>
							<Icon size={30} icon={determineKindIcon(todo.kind)} />
						</div>
						<div className="pt-3 pl-1">
							{todo.status ? <span><u>{todo.text}</u></span> : <del>{todo.text}</del>}
						</div>
					</div>
					<div>

					</div>
				</div>
				<div className="li-style width-details p-2 d-flex flex-column justify-content-between align-content-start"
						 style={{ 'border': todo.isOpen ? '1px solid orange' : '1px solid #177C72'}}>
					{isThisNewTodo ?
						// you shouldn't be able to remove new todo
						null
						:
						<button
							type="button"
							className={'remove border border-dark rounded close ml-4'}
							onClick={() => dispatch({ type: 'remove', payload: todo })}
							aria-label="Close">
							<span aria-hidden="true">
									&times;
							</span>
						</button>
					}
					<div className="d-flex flex-column align-content-center status-handler li-style">
						<div className={'d-flex flex-row justify-content-center'}>
							<div className={'border-1 border-secondary'}>
								<form>
									<select id="kind" name="kind" value={todo.kind} onChange={event => handleSelect(event, todoIndex)}>
										<option value="work">Work</option>
										<option value="chores">Chores</option>
										<option value="leisure">Leisure</option>
									</select>
								</form>
							</div>
						</div>
						<div className={'subtasks-parent'}>
							<div className={`subtasks ${todo.isOpen ? 'test-open' : 'test-closed' }`}
									 style={{ 'border': todo.isOpen ? '1px solid orange' : '1px solid #177C72'}}>
								<div className={'subtasks-handler d-flex flex-row-reverse m-1'}
										 onClick={() => dispatch({ type: 'toggle_isOpen', payload: todo })}>
									<span><u>Subtasks</u></span>
								</div>
								<ul className={'ul-style m-1'}>
									{todo.subtasks.map((subtask, index) => {
										return <Subtask index={index} subtask={subtask} dispatch={dispatch} todo={todo} />
									})
									}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="d-flex flex-row-reverse align-content-end">
				<Form state={state} todo={todo} dispatch={dispatch} todoIndex={todoIndex} />
			</div>
		</li>);
};