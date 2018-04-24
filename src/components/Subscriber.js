import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteApiAction } from '../subscribersActions'
import PropTypes from 'prop-types';
// import Responses from './ApiResponses';


class Subscriber extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   visible: null,
    //   res: null
    // }
    this.handleTest = this.handleTest.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log('Subscriber has mounted');
  }

  emptyResponses() {
    // return this.state.res ? this.setState({ res: null }) : null;
  }

  handleTest(e) {
    console.log('check test', e);
  }

  handleDelete(e) {
    console.log('handleDelete', this.props);
    this.props.deleteApi({
      name: this.props.name
    })
  }

  render() {
    const { name, endpoint } = this.props;

    return (
      <div className="pressword-api-item">
        <p id={name}>API name: {name}, &nbsp; API endpoint: {name}</p>
      <div className="api-item-actions">
        <span id={`${name}-submit`} className="api-btn pressword-test-btn" onClick={this.handleTest}>Test</span>
        <span id="pressword-remove-api-submit" className="api-btn" onClick={this.handleDelete}>Delete API</span>
      </div>
      {/* <Responses name={name} responses={this.state.responses} /> */}
      </div>
    );
  }
}

Subscriber.propTypes = {
  name: PropTypes.string,
  endpoint: PropTypes.string
};

const mapStateToProps = ({ subscribers }) => ({
  subscribers
})

const mapDispatchToProps = dispatch => ({
  deleteApi: input => dispatch(deleteApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber);
