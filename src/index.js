import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import * as serviceWorker from './serviceWorker';
import { StoreContext, makeStore } from './store';

const store = makeStore();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router><App /></Router>
  </StoreContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
