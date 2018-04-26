import React, { Component } from 'react';
import Subscriber from './Subscriber';

export default props => {

  const apis = Object.keys(props.apis);
  return (
    <div id="pressword-api-display" className="container">
      <h1>APIs</h1>
      {
        apis.length && apis.map((api, id) => {
          let name = props.apis[api].name;
          return (
            <Subscriber
            key={`${name}-${id}`}
            name={props.apis[api].name}
            uri={props.apis[api].uri}
            properties={props.apis[api].properties}
            hooks={props.apis[api].hooks}
            />
          )
        })
      }
    </div>
  )
}
