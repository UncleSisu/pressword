import React, { Component } from 'react';

export default props => {
  return (
    <div id ={`${this.props.name}-pressword-msgs`}>
      {this.props.responses.map((res, id) => {
        <p key={id} className="responseMessage">{res}</p>
      })}
    </div>
  )
}
