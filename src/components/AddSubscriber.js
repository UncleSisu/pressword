import React, { Component } from 'react';
import { connect } from 'react-redux'
import { postApiAction } from '../subscribersActions'

class AddSubscriber extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   name: "",
    //   endpoint: ""
    // }
    this.state = this.getInitialState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      name: "",
      endpoint: ""
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  componentDidMount() {
    console.log('AddSubscriber has mounted');
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
