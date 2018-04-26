import React, { Component } from 'react';
import Property from './Property';

export default ({ properties, removeProperty }) => {
  return (
    <div className="pressword-properties">
      {
        properties.length ? properties.map((prop, id) => {
          return (
            <Property key={id} property={prop} removeProperty={removeProperty}/>
          )
        }) : null
      }
    </div>
  )
}
