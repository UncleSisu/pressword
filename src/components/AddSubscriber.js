import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postApiAction } from '../subscribersActions'
import CheckboxGroup from './CheckboxGroup'
import Properties from './Properties'
import AddProperty from './AddProperty'

class AddSubscriber extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();

    // bind events
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePropertySubmit = this.handlePropertySubmit.bind(this);
    this.handlePropertyRemoval = this.handlePropertyRemoval.bind(this);
    this.submitHooks = this.submitHooks.bind(this);
  }

  getInitialState() {
    return {
      name: "",
      uri: "",
      properties: [],
      hooks: []
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  componentDidMount() {
    // console.log('AddSubscriber has mounted');
  }

  handleSubmit(e) {
    console.log('check submit', this.state);
    const { name, uri, hooks, properties } = this.state;
    this.props.postApi({
      name,
      uri,
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

  // Properties
  handlePropertySubmit(property) {
    console.log('hi mom submitting property', property)
    const { properties } = this.state;
    properties.push(property);
    this.setState({
      properties
    });
  }

  handlePropertyRemoval(property) {
    console.log('hi mom removing property', property)
    const properties = this.state.properties.filter(prop => {
      return prop.name !== property.name;
    })
    this.setState({ properties });
  }

  // Checkbox/Hook submission
  submitHooks(hooks) {
    this.setState({ hooks }, () => console.log('recent checks in state', this.state.hooks));
  }

  render() {
    return (
      <div className='add-subscriber-container'>
        <div className="pressword-new-api-container form-inline">
          <input
            value={this.state.name}
            className="pressword-new-api-alias-input form-inline"
            type="text"
            onChange={event => this.handleApiInput(event, `name`)} /> &nbsp; Add API name
        </div>
        <div className="pressword-new-api-uri-container form-inline">
          <input
            type="text"
            className="pressword-new-api-uri-input"
            value={this.state.uri}
            onChange={event => this.handleApiInput(event, `uri`)}/> &nbsp; Enter API url for PressWord broadcasting
        </div>
        <CheckboxGroup submitHooks={this.submitHooks}/>
        <div className="pressword-property-group">
          <h1>Properties</h1>
          <AddProperty submitProperty={this.handlePropertySubmit}/>
          <Properties
            properties={this.state.properties}
            removeProperty={this.handlePropertyRemoval}
          />
        </div>
        <div className="pressword-api-ctas">
          <span className="pressword-api-submit api-btn" onClick={this.handleSubmit}>Add API</span>
        </div>
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
