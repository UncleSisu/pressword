import React, { Component } from 'react';
import Subscriber from './Subscriber';

export default class Subscribers extends Component {
  // constructor(props) {
  //   super(props)
  // }
  //
  componentDidMount() {
    console.log('Subscribers has mounted', this.props);
  }

  render() {
    return (
      <div id="pressword-api-display" className="container">
      {
        this.props.apis.map((api, id) => {
          return (
            <Subscriber key={id} alias={api.alias} endpoint={api.endpoint} />
          )
        })
      }
      </div>
    );
  }
}
