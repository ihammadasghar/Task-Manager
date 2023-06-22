import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { authActions } from './store/auth/slice';
import { uiActions } from './store/ui/slice';

window.store = store;

const root_elem = document.getElementById("root");
const props = Object.assign({}, root_elem.dataset);
store.dispatch(authActions.setInitialState(props));
store.dispatch(uiActions.setInitialState(props));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>

);
