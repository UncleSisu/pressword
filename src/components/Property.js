import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Property extends Component {
  constructor(props) {
    super(props)
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(e, property) {
    this.props.removeProperty(property);
  }

  render() {
    const { property } = this.props;
    return (
      <div className="pressword-property-item">
      <pre>{` {\n name: ${property.name},\n value: ${property.value}\n }`}</pre>
        <span className="pressword-property-remove" onClick={(e) => this.handleRemoval(e, property)}>Remove</span>
      </div>
    );
  }
}

// Property.propTypes = {
//   name: PropTypes.string,
//   uri: PropTypes.string
// };

export default Property;
