import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postApiAction } from '../subscribersActions'
import Checkbox from './Checkbox'
import wpHooks from '../utils/wpHooks'

const actions = Object.keys(wpHooks.Post);
const types = Object.keys(wpHooks);

class AddSubscriber extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handlePropertySubmit = this.handlePropertySubmit.bind(this);
    this.handlePropertyRemoval = this.handlePropertyRemoval.bind(this);
  }

  getInitialState() {
    return {
      name: "",
      endpoint: "",
      property_name: "",
      property_value: "",
      properties: [],
      hooks: null
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  componentDidMount() {
    console.log('AddSubscriber has mounted');
  }

  componentWillMount() {
    this.selectedCheckboxes = types.reduce((acc, curr) => {
      acc[curr] = new Set()
      return acc;
    }, {})
  }

  toggleCheckbox(type, label) {
    if (this.selectedCheckboxes[type].has(label)) {
      this.selectedCheckboxes[type].delete(label);
    } else {
      this.selectedCheckboxes[type].add(label);
    }

    const hooks = Object.keys(this.selectedCheckboxes)
      .reduce((acc, curr) => {
        let acts = Array.from(this.selectedCheckboxes[curr]);
        if (acts.length) {
          acts.forEach(act => {
            acc = acc.concat(wpHooks[curr][act]);
          })
        }
        return acc;
      }, []);

    this.setState({ hooks }, () => console.log('recent checks in state', this.state.hooks));
  }

  handleSubmit(e) {
    console.log('check submit', this.state);
    const { name, endpoint, hooks, properties } = this.state;
    this.props.postApi({
      name,
      endpoint,
      hooks,
      properties
    })
    this.resetState();
  }

  handleApiInput(event, type) {
    console.log('see event and type', event.target.value, type);
    let update = {};
    update[type] = event.target.value;
    this.setState(update);
  }

  handlePropertyInput(event, type) {
    console.log('see event and type', event.target.value, type);
    let update = {};
    update[`property_${type}`] = event.target.value;
    this.setState(update);
  }

  createPropertyInput() {
    return (
      <div id="pressword-new-property-inputs-container" className="form-inline">
        <div className="pressword-new-property-name">
          <input
            id="pressword-property-name-input"
            value={this.state.property_name}
            className="form-inline"
            type="text"
            onChange={event => this.handlePropertyInput(event, `name`)} /> &nbsp; Enter property name
        </div>
        <div id="pressword-new-property-value" className="form-inline">
          <input
            type="text"
            id="pressword-property-value-input"
            value={this.state.property_value}
            onChange={event => this.handlePropertyInput(event, `value`)}/> &nbsp; Enter API property value
        </div>
        <span id="pressword-new-property-submit" className="api-btn" onClick={this.handlePropertySubmit}>Add Property</span>
      </div>
    )
  }

  handlePropertySubmit(e) {
    console.log('hi mom submitting property', e)
    const { properties, property_name, property_value } = this.state;
    properties.push({
      name: property_name,
      value: property_value
    })
    this.setState({
      properties,
      property_name: "",
      property_value: ""
    });
  }

  handlePropertyRemoval(e, property) {
    console.log('hi mom removing property', e, property)
    const properties = this.state.properties.filter(prop => {
      return prop.name !== property.name;
    })
    this.setState({ properties });
  }

  showProperties(properties) {
    return (
      <div className="pressword-property-group">
        {
        properties.map(prop => (
          <div key={prop} className="pressword-property-item-container">
            <div key={prop} className="pressword-property-item">
              <h2>{prop.name}</h2>
              <h2>{prop.value}</h2>
            </div>
            <span id="pressword-new-property-remove" className="api-btn" onClick={(e) => this.handlePropertyRemoval(e, prop)}>Remove Property</span>
          </div>
        ))
        }
      </div>
    )
  }

  createCheckboxes() {
    return types.map(type => (
      <div key={type} className="check-typegroup">
        <h2>{type}</h2>
        <div className="check-actiongroup">
          {actions.map( action => (
            <Checkbox
              label={action}
              type={type}
              handleCheckboxChange={this.toggleCheckbox}
              key={action}
            />
          ))}
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className='container'>
        <div id="pressword-new-api-alias-container" className="form-inline">
          <input
            id="pressword-new-api-alias-input"
            value={this.state.name}
            className="form-inline"
            type="text"
            onChange={event => this.handleApiInput(event, `name`)} /> &nbsp; Add API name
        </div>
        <div id="pressword-new-api-url-container" className="form-inline">
          <input
            type="text"
            id="pressword-new-api-url-input"
            value={this.state.endpoint}
            onChange={event => this.handleApiInput(event, `endpoint`)}/> &nbsp; Enter API url for PressWord broadcasting
        </div>
        <div className="pressword-api-checkgroup">
          {this.createCheckboxes()}
        </div>
        <div className="pressword-api-property-group">
          <div className="pressword-api-properties">{this.state.properties && this.showProperties(this.state.properties)}
          </div>
          {this.createPropertyInput()}
        </div>
        <span id="pressword-new-api-submit" className="api-btn" onClick={this.handleSubmit}>Add API</span>
      </div>
    );
  }
}

const mapStateToProps = ({ subscribers }) => ({
  subscribers
})

const mapDispatchToProps = dispatch => ({
  postApi: input => dispatch(postApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSubscriber);
