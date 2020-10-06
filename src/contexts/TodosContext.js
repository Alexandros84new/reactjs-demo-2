import React from 'react';

let initialState = [
    { id: 1, text: 'Do project', status: true, kind: 'work', isOpen: false, subtasks: [
            { text: 'Call Carl', status: true },
            { text: 'Email client', status: false },
            { text: 'Finish work in CAD', status: false }
        ] },
    { id: 2, text: 'Eat breakfast', status: true, kind: 'leisure', isOpen: true, subtasks: [
            { text: 'Bake bread', status: false },
            { text: 'Toast slices', status: false },
            { text: 'Spread butter', status: false },
            { text: 'Enjoy!', status: false }
        ] },
    { id: 3, text: 'Do laundry', status: true, kind: 'home', isOpen: false, subtasks: [
            { text: 'Separate colors', status: false },
            { text: 'Take coins with you', status: false }
        ] }
];

export const TodosContext = React.createContext(initialState);