export const ChangeStatus = (state, action) => {
    console.log('I am being called', action.type);
    switch (action.type) {
        case 'toggle_isOpen':
            return state.map(todo => {
                return (todo.id === action.payload.id) ?
                  { ...todo, isOpen: !todo.isOpen }
                  :
                  // close all others if payload is opening
                  { ...todo, isOpen: false };
            });
        case 'toggle':
            return state.map(todo => {
                return (todo.id === action.payload.id) ?
                    { ...todo, status: !todo.status, isOpen: false, subtasks: todo.subtasks.map(st => {
                            return { ...st, status: !todo.status }
                        }) }
                        :
                    { ...todo };
            });
        case 'edit_todo':
            return state.map((todo, index) => {
                return (index === state.length - 1) ?
                  { ...todo, text: action.payload.text, status: action.payload.status,
                      kind: action.payload.kind }
                  :
                  { ...todo };
            });
        case 'edit_subtask':
            let subtasksToBeEdited = state.find((todo, index) => index === action.payload.todoIndex).subtasks;
            // edit subtasks
            subtasksToBeEdited[action.payload.subtaskIndex] = { text: action.payload.text, status: true };
            return state.map((todo, index) => {
                return (index === action.payload.todoIndex) ?
                  { ...todo, subtasks: subtasksToBeEdited}
                  :
                  { ...todo };
            });
        case 'remove_subtask':
            let subtasksToBeRemoved = state.find((todo, index) => index === action.payload.todoIndex).subtasks;
            console.log('remove_subtask', action.payload.length, subtasksToBeRemoved.length);
            if (action.payload.length !== subtasksToBeRemoved.length) return state;
            // remove particular subtask
            subtasksToBeRemoved.splice(action.payload.subtaskIndex, 1);
            // reset mutated state
            return state.map((todo, index) => {
                return (index === action.payload.todoIndex) ?
                  { ...todo, subtasks: subtasksToBeRemoved}
                  :
                  { ...todo };
            });
        case 'change_kind':
            return state.map((todo, index) => {
                return (index === action.payload.todoIndex) ?
                  { ...todo, kind: action.payload.kind }
                  :
                  { ...todo };
            });
        case 'change_text':
            return state.map((todo, index) => {
                return (index === action.payload.todoIndex) ?
                  { ...todo, text: action.payload.text }
                  :
                  { ...todo };
            });
        case 'change_isEditOpen':
            return state.map((todo, index) => {
                return (index === action.payload.todoIndex) ?
                  { ...todo, isEditOpen: !todo.isEditOPen }
                  :
                  { ...todo };
            });
        case 'add_subtask':
            let subtasksToBeAdded = state.find((todo, index) => index === action.payload.todoIndex).subtasks;
            console.log('add_subtask', action.payload.length, subtasksToBeAdded.length);
            if (action.payload.length !== subtasksToBeAdded.length) return state;
            // add new subtask
            subtasksToBeAdded.splice(action.payload.subtaskIndex, 0, { text: '', status: true });
            console.log('add_subtask')
            // reset mutated state
            return state.map((todo, index) => {
                return (index === action.payload.todoIndex) ?
                  { ...todo, subtasks: subtasksToBeAdded}
                  :
                  { ...todo };
            });
        case 'toggle_subtask':
            let toggledSubtaskState = state.map(todo => {
                return (todo.id === action.payload.id) ?
                  { ...todo, subtasks: todo.subtasks.map(st => {
                        return (st.text === action.subtask.text) ?
                          { ...st, status: !st.status }
                            :
                          { ...st };
                      }) }
                  :
                  { ...todo };
            });
            let mutatedTodo = toggledSubtaskState.find(todo => todo.id === action.payload.id);
            // if all subtasks are done mark status as done
            let areAllSubtasksDone = mutatedTodo.subtasks.every(st => !st.status);
            return toggledSubtaskState.map(todo => {
                return (todo.id === action.payload.id) ?
                  {...todo, status: !areAllSubtasksDone}
                  :
                  {...todo};
            });
        case 'remove':
            let removedItemArray = state.filter(todo => todo.id !== action.payload.id);
            // sorting the ids according to real order
            return removedItemArray.map((todo, index) => ({ ...todo, id: index }));
        case 'add_todo':
            let newTodo = {
                text: action.payload.text,
                status: true,
                isOpen: false,
                kind: action.payload.kind,
                subtasks: action.payload.subtasks
            }
            let addedItemArray = [...state, newTodo]
            // sorting the ids according to real order
            return addedItemArray.map((todo, index) => ({ ...todo, id: index }));
        default:
            throw new Error();
    }
}