import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
} from 'react-redux';
import configureStore from './configureStore';
import rootReducer from './rootReducer'; 
import rootSaga from './sagas/rootSaga'
import Pressword from './components/Pressword';

const root = document.querySelector('#pressword-root');
const store = configureStore({});
store.runSaga(rootSaga)

if (root) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <Pressword />
    </Provider>,
    root
  )
}
