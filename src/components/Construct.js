import React, { Component } from 'react';
import ConstructSubscriber from './ConstructSubscriber';
// import { connect } from 'react-redux'
// import { getApisAction } from '../subscribersActions'

export default class Construct extends Component {
  constructor(props) {
    super(props)
    // this.state = props;
  }

  render() {
    return (
      <div className='container'>
        <ConstructSubscriber api={null} finishEdit={null}/>
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
// export default connect(mapStateToProps, mapDispatchToProps)(Construct)
