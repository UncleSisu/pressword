import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postApiAction } from '../subscribersActions'
import Checkbox from './Checkbox'
// import typeConverter from '../utils/typeConverter'

const actions = [
  'Publish',
  'Trash',
  'Edit'
];

const types = [
  'Page',
  'Attachment',
  'Comment',
  'Post',
  'Category'
];

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
      checks: []
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  componentDidMount() {
    console.log('AddSubscriber has mounted');
  }

  componentWillMount() {
    // this.selectedCheckboxes = new Set();
    // this.selectedCheckboxes = new Map();
    this.selectedCheckboxes = {};
  }

  toggleCheckbox(label, type) {
    // add error message
    if (!type) return;
    const lab = label.toLowerCase();
    const typ = type.toLowerCase();

    if (this.selectedCheckboxes[typ][lab]) {
      delete this.selectedCheckboxes[typ][lab];
    } else {
      this.selectedCheckboxes[typ][lab] = lab;
    }

    // if (this.selectedCheckboxes.has(label.toLowerCase())) {
    //   this.selectedCheckboxes.delete(label.toLowerCase());
    // } else {
    //   this.selectedCheckboxes.add(label.toLowerCase());
    // }

    this.setState({
      checks: Array.from(this.selectedCheckboxes)
    }, () => console.log('recent checks in state', this.state.checks));
  }

  handleSubmit(e) {
    console.log('check submit', this.state);
    this.props.postApi({
      name: this.state.name,
      endpoint: this.state.endpoint
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
        <Checkbox
          label={type}
          handleCheckboxChange={this.toggleCheckbox}
          key={type}
        />
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
