import React from 'react';
import Header from './Header'

export default (props) => (
  <section className="main-container">
    <Header />
    { props.children }
  </section>
);
