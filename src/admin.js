import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
} from 'react-redux';
import configureStore from './store/configureStore';
import rootReducer from './store/reducers/rootReducer'; 
import rootSaga from './store/sagas/rootSaga'
import Main from './main';

const root = document.querySelector('#pressword-root');
const store = configureStore({});
store.runSaga(rootSaga)

if (root) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <Main />
    </Provider>,
    root
  )
}
