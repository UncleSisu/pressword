import React, { Component } from 'react';
import Apis from './Apis';
import Info from './Info';
// import { connect } from 'react-redux'
// import { postApisAction } from '../store/actions/apisActions'

export default class Configure extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      search: "",
      searching: false,
      checked: [],
      bulkAction: ''
    }
  }

  resetState = () => {
    this.setState(this.getInitialState());
  }

  handleUpdate = (apiName, prop, value, action, type) => {
    this.props.handleUpdate(apiName, prop, value, action);
  }

  handleSearch = (name) => {
    this.setState({
      search: name
    });
  }

  handleSearchDisplay = (event) => {
    this.setState({
      search: "",
      searching: !this.state.searching
    });
  }

  handleSearchInput = (event) => {
    this.setState({search: event.target.value});
  }

  handleCheckboxChange = (name) => {
    let checked = this.state.checked;
    if (checked.some(check => check === name)) {
      checked = checked.filter(check => check !== name);
    } else {
      checked.push(name);
    }
    this.setState({
      checked
    }, () => console.log('after checked', this.state))
  }

  handleBulkAction = (ev) => {
    console.log('check the bulk', this.state.checked, this.state.bulkAction)
      switch(this.state.bulkAction){
        case 'delete':
          this.handleUpdate(this.state.checked, null, null, 'delete', 'bulk')
          break;
        case 'activate':
          this.handleUpdate(this.state.checked, 'active', true, 'update', 'bulk')
          break;
        case 'deactivate':
          this.handleUpdate(this.state.checked, 'active', false, 'update', 'bulk')
          break;
        default:
          break;
      }
    return;
  }

  handleSelectChange = (event) => {
    this.setState({bulkAction: event.target.value})
  }

  render() {
    let visibleApis;
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

    if (this.state.search.length) {
      visibleApis = this.state.search === 'active' ? active : searched;
    } else {
      visibleApis = this.props.apis;
    }

    return (
      <div className='pressword-config-container'>
        <div className='pressword-configurations-container'>
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
                onChange={this.handleSearchInput} />
                <div className="pressword-config-search-ctas">
                  <div className="pressword-config-search-exit" onClick={this.handleSearchDisplay}><span className="dashicons dashicons-no-alt"></span></div>
                </div>
            </div>)}
          </div>
          <Apis
            apis={visibleApis}
            handleUpdate={this.handleUpdate}
            handleCheckboxChange={this.handleCheckboxChange}
          />

          <div className="pressword-config-bulkactions">
            <select value={this.state.bulkAction} name="bulks" className="pressword-bulk-action-selector-bottom" onChange={this.handleSelectChange}>
              <option value="-1" className="pressword-config-bulk-action">Bulk Actions</option>
              <option value="delete" className="pressword-config-bulk-action">Delete</option>
              <option value="deactivate" className="pressword-config-bulk-action">Deactivate</option>
              <option value="activate" className="pressword-config-bulk-action">Activate</option>
            </select>
            <div className="pressword-config-bulk-submit" onClick={this.handleBulkAction}>Apply</div>
          </div>
        </div>
        <Info />
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
