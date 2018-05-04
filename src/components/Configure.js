import React, { Component } from 'react';
import Apis from './Apis';
// import { connect } from 'react-redux'
// import { postApisAction } from '../store/actions/apisActions'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    // this.state = props;
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(api, name, value) {
    // const { name, uri, hooks, properties, active } = api;
    // this.props.postApi({
    //   name,
    //   uri,
    //   hooks,
    //   properties,
    //   active
    // })
    this.props.handleUpdate(api, name, value);
  }

  render() {
    console.log('wtf apis', this.props.apis)
    // const apis = Object.keys(this.props.apis);
    // const all = apis.length;
    // const active = apis.filter( api => {
    //   return this.props.apis[api].active;
    // }).length;

    return (
      <div className='pressword-container'>
        <div className="pressword-config-head">
          <h1><span>All ({this.props.apis && Object.keys(this.props.apis).length})</span> |</h1>
          <h1><span>Active ({this.props.apis && Object.keys(this.props.apis).filter(api => this.props.apis[api].active).length})</span> | </h1>
          <h1><span>Search</span></h1>
        </div>
        <Apis apis={this.props.apis} handleUpdate={this.handleUpdate}/>

      {/*<div className="pressword-config-bulkactions">
          <select name="bulks" className="pressword-bulk-action-selector-bottom">
            <option value="-1">Bulk Actions</option>
            <option value="pressword-config-bulk-delete" className="">Delete</option>
            <option value="pressword-config-bulk-deactivate">Deactivate</option>
          </select>
          <div className="pressword-config-bulk-submit pressword-btn">Apply</div>
        </div>*/}

      </div>
    );
  }
}

// const mapStateToProps = ({ apis }) => ({
//   apis: apis.apis
// })
//
// const mapDispatchToProps = dispatch => ({
//   postApi: input => dispatch(postApiAction(input))
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Configure)
