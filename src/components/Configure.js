import React, { Component } from 'react';
import Subscribers from './Subscribers';
// import { connect } from 'react-redux'
// import { getApisAction } from '../subscribersActions'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    // this.state = props;
  }

  render() {
    return (
      <div className='container'>
        <h1>APIs</h1>
        <Subscribers apis={this.props.subscribers}/>
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
// export default connect(mapStateToProps, mapDispatchToProps)(Configure)
