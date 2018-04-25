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
  }

  getInitialState() {
    return {
      name: "",
      endpoint: "",
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
    const { name, endpoint, hooks } = this.state;
    this.props.postApi({
      name,
      endpoint,
      hooks
    })
    this.resetState();
  }

  handleInputState(event, type) {
    console.log('see event and type', event.target.value, type);
    let update = {};
    update[type] = event.target.value;
    this.setState(update);
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
            onChange={event => this.handleInputState(event, `name`)} /> &nbsp; Add API name
        </div>
        <div id="pressword-new-api-url-container" className="form-inline">
          <input
            type="text"
            id="pressword-new-api-url-input"
            value={this.state.endpoint}
            onChange={event => this.handleInputState(event, `endpoint`)}/> &nbsp; Enter API url for PressWord broadcasting
          <div className="pressword-api-checkgroup">
            {this.createCheckboxes()}
          </div>
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
