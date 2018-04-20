import React, { Component } from 'react';
import AddSubscriber from './AddSubscriber';
import RemoveSubscriber from './RemoveSubscriber';

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  render() {
    return (
      <div className='container'>
        <AddSubscriber />
        <RemoveSubscriber />
      </div>
    );
  }
}
