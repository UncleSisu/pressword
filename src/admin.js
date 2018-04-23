import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Pressword from './components/Pressword';

const root = document.querySelector('#pressword-root');
if (root) {
  ReactDOM.render(
    <Pressword /> ,
    document.querySelector('#pressword-root')
  );
}
