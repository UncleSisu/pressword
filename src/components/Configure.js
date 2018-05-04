import React, { Component } from 'react';
import Apis from './Apis';
// import { connect } from 'react-redux'
// import { postApisAction } from '../store/actions/apisActions'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearchDisplay = this.handleSearchDisplay.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchInput = this.handleSearchInput.bind(this)
  }

  getInitialState() {
    return {
      search: "",
      searched: [],
      searching: false
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  handleUpdate(api, name, value) {
    this.props.handleUpdate(api, name, value);
  }

  handleSearch(name) {
    this.setState({
      search: name
    });
  }

  handleSearchDisplay(event) {
    this.setState({
      search: "",
      searching: !this.state.searching
    });
  }

  handleSearchInput(event, type) {
    let update = {};
    update[type] = event.target.value;
    this.setState(update);
  }

  render() {
    const apis = Object.keys(this.props.apis);
    const all = apis.length;
    const activeLength = apis.filter( api => {
      return this.props.apis[api].active === 'true';
    }).length;
    const active = apis.reduce(( acc,curr ) => {
      if (this.props.apis[curr].active === 'true') {
        acc[curr] = this.props.apis[curr];
      }
      return acc;
    }, {});
    const searched = apis.reduce(( acc,curr ) => {
      if (this.props.apis[curr].name.indexOf(this.state.search) > -1) {
        acc[curr] = this.props.apis[curr];
      }
      return acc;
    }, {});

    let visibleApis;

    if (this.state.search.length) {
      visibleApis = this.state.search === 'active' ? active : searched;
    } else {
      visibleApis = this.props.apis;
    }

    return (
      <div className='pressword-container'>
        <div className="pressword-config-head">
          { !this.state.searching ? (
          <div className="pressword-config-head-options">
            <h1><span onClick={() => this.handleSearch('')}>All ({all})</span> |</h1>
            <h1><span onClick={() => this.handleSearch('active')}>Active ({activeLength})</span> | </h1>
            <h1><span onClick={this.handleSearchDisplay}>Search</span></h1>
          </div>)
            :
          (<div className="pressword-config-head-search">
            <input
              value={this.state.search}
              className="pressword-config-search-input form-inline"
              placeholder="Type in API name"
              type="text"
              onChange={ev => this.handleSearchInput(ev, `search`)} />
              <div className="pressword-config-search-ctas">
                <div className="pressword-config-search-submit" onClick={() => this.handleSearch(this.state.search)}>Y</div>
                <div className="pressword-config-search-exit" onClick={this.handleSearchDisplay}>X</div>
              </div>
          </div>)}
        </div>
        <Apis apis={visibleApis} handleUpdate={this.handleUpdate}/>
      </div>
    );
  }
}

      /*<div className="pressword-config-bulkactions">
          <select name="bulks" className="pressword-bulk-action-selector-bottom">
            <option value="-1">Bulk Actions</option>
            <option value="pressword-config-bulk-delete" className="">Delete</option>
            <option value="pressword-config-bulk-deactivate">Deactivate</option>
          </select>
          <div className="pressword-config-bulk-submit pressword-btn">Apply</div>
        </div>*/

// const mapStateToProps = ({ apis }) => ({
//   apis: apis.apis
// })
//
// const mapDispatchToProps = dispatch => ({
//   postApi: input => dispatch(postApiAction(input))
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Configure)
