import React, { Component } from 'react';
import Property from './Property';

export default ({ properties, removeProperty, configView }) => {
  return (
    <div className="pressword-properties">
    {properties && properties.length ? <pre> [</pre> : null}
      {
        properties && properties.length ? properties.map((prop, id) => {
          return (
            <Property key={id} property={prop} removeProperty={removeProperty} configView={configView}/>
          )
        }) : null
      }
    {properties && properties.length ? <pre> ]</pre> : null}
    </div>
  )
}
