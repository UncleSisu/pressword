import React, { Component } from 'react';
import Api from './Api';

export default props => {
    const { apis, handleUpdate } = props;
    const apisRegistry = Object.keys(apis);
    console.log('wtf where my apis', props)
    return (
      <div className="pressword-apis-container">
        {
          apisRegistry.length && apisRegistry.map((api, id) => {
            let name = apis[api].name;
            return (
              <Api
                key={`${name}-${id}`}
                api={apis[api]}
                name={apis[api].name}
                uri={apis[api].uri}
                properties={apis[api].properties}
                hooks={apis[api].hooks}
                active={apis[api].active}
                handleUpdate={handleUpdate}
              />
            )
          })
        }
      </div>
    )
}