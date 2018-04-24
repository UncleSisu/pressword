import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Pressword';

export default (store) => {
  return (
    <Route component={Layout}>
      <Route path="/" component={Home}/>
    </Route>
  )
};
