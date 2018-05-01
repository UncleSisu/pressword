import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postApiAction } from '../store/actions/subscribersActions'
import CheckboxGroup from './CheckboxGroup'
import Properties from './Properties'
import ConstructProperty from './ConstructProperty'

class ConstructSubscriber extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState(props.api);

    // bind events
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePropertySubmit = this.handlePropertySubmit.bind(this);
    this.handlePropertyRemoval = this.handlePropertyRemoval.bind(this);
    this.submitHooks = this.submitHooks.bind(this);
  }

  getInitialState(api) {
    let state = api || {
      name: "",
      uri: "",
      properties: [],
      hooks: []
    }

    state.properties = Array.isArray(state.properties) ? state.properties : [];
    state.hooks = Array.isArray(state.hooks) ? state.hooks : [];
    return state;
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  handleSubmit(e) {
    const { name, uri, hooks, properties } = this.state;
    this.props.postApi({
      name,
      uri,
      hooks,
      properties
    })

    if (this.props.finishEdit) {
      this.props.finishEdit(e);
    }
    this.resetState();
  }

  handleApiInput(event, type) {
    let update = {};
    update[type] = event.target.value;
    this.setState(update);
  }

  // Properties
  handlePropertySubmit(property) {
    const { properties } = this.state;
    properties.push(property);
    this.setState({
      properties
    });
  }

  handlePropertyRemoval(property) {
    const properties = this.state.properties.filter(prop => {
      return prop.name !== property.name;
    })
    this.setState({ properties });
  }

  // Checkbox/Hook submission
  submitHooks(hooks) {
    this.setState({ hooks });
  }

  render() {
    return (
      <div className="pressword-construct-container">
        {
          this.props.finishEdit ? 
          (<div className="pressword-construct-exit" onClick={this.props.finishEdit}>
            <span>X</span>
          </div>)
           : null
        }
        <div className="pressword-new-api-container form-inline">
          <input
            value={this.state.name}
            className="pressword-new-api-alias-input form-inline"
            type="text"
            onChange={event => this.handleApiInput(event, `name`)} /> &nbsp; Enter API name
        </div>
        <div className="pressword-new-api-uri-container form-inline">
          <input
            type="text"
            className="pressword-new-api-uri-input"
            value={this.state.uri}
            onChange={event => this.handleApiInput(event, `uri`)}/> &nbsp; Enter API uri
        </div>
        <CheckboxGroup submitHooks={this.submitHooks} hooks={this.state.hooks}/>
        <div className="pressword-property-group">
          <h1>Properties</h1>
          <ConstructProperty submitProperty={this.handlePropertySubmit}/>
          <Properties
            properties={this.state.properties}
            removeProperty={this.handlePropertyRemoval}
            configView={false}
          />
        </div>
        <div className="pressword-construct-ctas">
          <span className="pressword-api-submit pressword-btn" onClick={this.handleSubmit}>{this.props.finishEdit ? 'Save API' : 'Add API'}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstructSubscriber);
