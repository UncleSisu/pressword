import React, { Component } from 'react';
import AddSubscriber from './AddSubscriber';
// import Subscribers from './Subscribers';
// import { connect } from 'react-redux'
// import { getApisAction } from '../subscribersActions'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    // this.state = props;
  }

  // { this.props.subscribers ? <Subscribers apis={this.props.subscribers}/> : null}
  render() {
    return (
      <div className='container'>
        <AddSubscriber />
      </div>
    );
  }
}

// const mapStateToProps = ({ subscribers }) => ({
//   subscribers
// })
//
// const mapDispatchToProps = dispatch => ({
//   getApis: () => dispatch(getApisAction())
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Pressword)
