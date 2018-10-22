import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';


const orders = (state=[], action) => {
  switch (action.type) {
    case 'GET_ORDERS':
      return action.payload;
    default:
      return state;
  }
}

const inventory = (state=[], action) => {
  switch (action.type) {
    case 'GET_INVENTORY':
      return action.payload;
    case 'EDIT_INVENTORY':
      return action.payload;
    default:
      return state;
  }
}

const allReducers = combineReducers({
  orders,
  inventory
})

const store = createStore(
  allReducers,
  applyMiddleware(logger),
)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
