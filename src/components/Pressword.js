import React, { Component } from 'react';
import AddSubscriber from './AddSubscriber';
import Subscribers from './Subscribers';
import { connect } from 'react-redux'
import { getApisAction } from '../subscribersActions'

class Pressword extends Component {
  constructor(props) {
    super(props)
    this.state = props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.subscribers);
  }

  componentDidMount() {
    // initial pull of api object
    this.props.getApis();
  }

  render() {
    return (
      <div className='container'>
        <AddSubscriber />
        { this.state.subscribers && <Subscribers apis={this.state.subscribers}/> }
      </div>
    );
  }
}

const mapStateToProps = ({ subscribers }) => ({
  subscribers
})

const mapDispatchToProps = dispatch => ({
  getApis: () => dispatch(getApisAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Pressword)
