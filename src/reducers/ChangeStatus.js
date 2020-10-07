export const ChangeStatus = (state, action) => {
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
                subtasks: [{ text: 'new subtask', status: true }]
            }
            let addedItemArray = [...state, newTodo]
            // sorting the ids according to real order
            return addedItemArray.map((todo, index) => ({ ...todo, id: index }));
        default:
            // return state;
            throw new Error();
    }
}