import React, { Component } from 'react'

class AddProperty extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      property_name: "",
      property_value: ""
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  handlePropertyInput(event, type) {
    console.log('see event and type', event.target.value, type);
    let update = {};
    update[`property_${type}`] = event.target.value;
    this.setState(update);
  }

  handleSubmit(e) {
    console.log('hi mom submitting property', e)
    const { property_name, property_value } = this.state;
    const property = {
      name: property_name,
      value: property_value
    };
    this.props.submitProperty(property);
    this.resetState();
  }

  render() {
    return (
      <div className="pressword-property-inputs-container form-inline">
        <div className="pressword-property-name">
          <input
            value={this.state.property_name}
            className="pressword-property-name-input form-inline"
            type="text"
            onChange={event => this.handlePropertyInput(event, `name`)} /> &nbsp; Enter property name
        </div>
        <div className="pressword-property-value form-inline">
          <input
            type="text"
            className="pressword-property-value-input"
            value={this.state.property_value}
            onChange={event => this.handlePropertyInput(event, `value`)}/> &nbsp; Enter API property value
        </div>
        <span className="pressword-property-submit api-btn" onClick={this.handleSubmit}>Add Property</span>
      </div>
    )
  }

}

// AddProperty.propTypes = {
//   name: PropTypes.string,
//   uri: PropTypes.string
// };

export default AddProperty;
