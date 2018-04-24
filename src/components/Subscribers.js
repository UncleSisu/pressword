import React, { Component } from 'react';
import Subscriber from './Subscriber';

export default props => {

  const apis = Object.keys(props.apis);
  return (
    <div id="pressword-api-display" className="container">
      {
        apis.length && apis.map((api, id) => {
          return (
            <Subscriber key={id} name={props.apis[api].name} endpoint={props.apis[api].endpoint} />
          )
        })
      }
    </div>
  )
}
