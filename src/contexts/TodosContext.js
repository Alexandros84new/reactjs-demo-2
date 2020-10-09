import React from 'react';

let initialState = [
    { id: 1, text: 'Do project', status: true, kind: 'work', isEditOpen: false,
      isOpen: false, subtasks: [
            { text: 'Call Carl', status: true },
            { text: 'Email client', status: false },
            { text: 'Finish work in CAD', status: false }
        ] },
    { id: 2, text: 'Eat breakfast', status: false, kind: 'leisure', isEditOpen: false,
      isOpen: true, subtasks: [
            { text: 'Bake bread', status: false },
            { text: 'Toast slices', status: false },
            { text: 'Spread butter', status: false },
            { text: 'Enjoy!', status: false }
        ] },
    { id: 3, text: 'Do laundry', status: false, kind: 'chores', isEditOpen: false,
      isOpen: false, subtasks: [
            { text: 'Separate colors', status: false },
            { text: 'Take coins with you', status: false }
        ] },
    { id: 4, text: '', status: true, kind: 'chores', isOpen: false, subtasks: [
            { text: '', status: true }
        ] }
];

export const TodosContext = React.createContext(initialState);