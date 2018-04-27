import React, { Component } from 'react';
import Subscriber from './Subscriber';

export default props => {
    const { apis } = props;
    const apisRegistry = Object.keys(apis);
    return (
      <div className="pressword-subscribers-container">
        <h1>APIs</h1>
        {
          apisRegistry.length && apisRegistry.map((api, id) => {
            let name = apis[api].name;
            return (
              <Subscriber
                key={`${name}-${id}`}
                api={apis[api]}
                name={apis[api].name}
                uri={apis[api].uri}
                properties={apis[api].properties}
                hooks={apis[api].hooks}
              />
            )
          })
        }
      </div>
    )
}
