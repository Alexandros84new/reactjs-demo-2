import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { AppContent } from './components/AppContent';
import { TodosContext } from "./contexts/TodosContext";
import { ChangeStatus } from "./reducers/ChangeStatus";

const App = ({ initialState }) => {
    const [state, dispatch] = useReducer(ChangeStatus, initialState);

    return (<div>
        <TodosContext.Provider value={{ state, dispatch }}>
            <AppContent />
        </TodosContext.Provider>
    </div>);
}

// https://markoskon.com/usereducer-and-usecontext-a-performance-problem/
// doesn't seem to help

const AppParent = () => {
    const initialState = useContext(TodosContext);
    return (
      <App initialState={initialState} />
    );
}


ReactDOM.render(
  <React.StrictMode>
    <AppParent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
