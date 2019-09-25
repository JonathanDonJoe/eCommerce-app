import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reduxPromise from 'redux-promise';
// import reduxThunk from 'redux-thunk'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';


// const reduxMiddleware = [reduxPromise, reduxThunk]
const reduxMiddleware = [reduxPromise]
const theStore = applyMiddleware(...reduxMiddleware)(createStore)(rootReducer);

ReactDOM.render(
    <Provider store={theStore}>
        <App />
    </Provider>
    , 
    document.getElementById('root')
);

