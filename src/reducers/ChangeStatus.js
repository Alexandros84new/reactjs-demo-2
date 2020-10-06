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
                    { ...todo, status: !todo.status }
                        :
                    { ...todo };
            });
        case 'toggle_subtask':
            return state.map(todo => {
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
        case 'remove':
            let removedItemArray = state.filter(todo => todo.id !== action.payload.id);
            // sorting the ids according to real order
            return removedItemArray.map((todo, index) => ({ ...todo, id: index }));
        case 'add':
            let newTodo = {
                text: action.payload.text,
                status: true,
            }
            let addedItemArray = [...state, newTodo]
            // sorting the ids according to real order
            return addedItemArray.map((todo, index) => ({ ...todo, id: index }));
        default:
            // return state;
            throw new Error();
    }
}