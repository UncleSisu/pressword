import React, { Component } from 'react';
import ConstructApi from './ConstructApi';
// import { connect } from 'react-redux'
// import { getApisAction } from '../apisActions'

export default class Construct extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      construct: false
    };
  }

  resetState = () => {
    this.setState(this.getInitialState());
  }

  startConstruct = () => {
    this.setState({ construct: true })
  }

  stopConstruct = () => {
    this.setState({ construct: false })
  }

  render() {
    return (
      <div className='pressword-container'>
        <div className="pressword-construct-head">
          <h1>APIs</h1>
          {/*<div className="pressword-round-button" onClick={this.startConstruct}>+</div>*/}
          <div className="pressword-btn" onClick={this.startConstruct}>Add New</div>
        </div>
        { this.state.construct && <ConstructApi api={null} finishEdit={this.stopConstruct}/> }
      </div>
    );
  }
}

// const mapStateToProps = ({ apis }) => ({
//   apis
// })
//
// const mapDispatchToProps = dispatch => ({
//   getApis: () => dispatch(getApisAction())
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Construct)
