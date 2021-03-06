import React, { Component } from 'react';
import ConstructApi from './ConstructApi'
import Properties from './Properties'
import { connect } from 'react-redux'
import { deleteApiAction, postApiAction } from '../store/actions/apisActions'
import PropTypes from 'prop-types';


class Api extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }

  // TODO: reset checked on bulk action
  getInitialState = () => {
    return {
      edit: false,
      show: false,
      ctas: false,
      isChecked: false
    }
  }

  resetState = () => {
    this.setState(this.getInitialState());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkall !== this.props.checkall) {
      this.handleCheckboxChange(null, nextProps.checkall);
    }
    // return;
  }

  handleChange = (e) => {
    this.setState({
      edit: !this.state.edit
    })
    this.handleCTAdisplay(!this.state.ctas);
    if (this.state.show) {
      this.setState({show: false})
    }
  }

  showApi = (e) => {
    this.setState({show: !this.state.show})
  }

  handleCTAdisplay = (view) => {
    this.setState({ctas: view})
  }

  handleActivation = (e) => {
    const active = this.props.active === 'true' ? false : true;
    let api = Object.assign({}, this.props.api);
    api.active = active;
    this.props.postApi(api)
  }

  handleDelete = (e) => {
    this.props.deleteApi({
      name: this.props.name
    })
  }

  handleCheckboxChange = (event, checkValue = null) => {
    const { handleCheckboxChange, name } = this.props;
    let isChecked;
    if (checkValue === null) {
      isChecked = !this.state.isChecked;
    } else {
      isChecked = checkValue;
    }
    this.setState({isChecked}, () => handleCheckboxChange(name));
  }

  render() {
    let {
      name,
      uri,
      properties,
      hooks,
      api,
      active
    } = this.props;

    return (
      <div className="pressword-api-container" onMouseEnter={() => !this.state.edit && this.handleCTAdisplay(true)} onMouseLeave={() => this.handleCTAdisplay(false)}>

        <div className="pressword-inline-api">
          <input
            type="checkbox"
            checked={this.state.isChecked}
            label={name}
            onChange={e => this.handleCheckboxChange(e)}
          />
          <div className="pressword-api-meta">{name}</div>
        </div>

      { this.state.edit ?
        <ConstructApi api={api} finishEdit={this.handleChange} />
         : (
         this.state.show &&
          <div className="pressword-api">
            <p><span className="pressword-title">Name:</span> {name}</p>
            <p><span className="pressword-title">URI:</span> {uri}</p>
            <div className="pressword-api-props">
              <p className="pressword-title">Properties:</p>
              { Array.isArray(properties) ?
                <Properties
                  properties={properties}
                  removeProperty={null}
                  configView={true}
                />
               : 'No properties configured'}
            </div>

            <div className="pressword-api-hooks">
              <p className="pressword-title">Hooks:</p>
              { hooks && hooks.length && <pre> [</pre> }
              { hooks && hooks.length ?
                hooks.map(hook => {
                  return (
                    <pre key={hook}>{`\t${hook},`}</pre>
                  )
                })
              : 'No hooks configured'}
              { hooks && hooks.length && <pre> ]</pre> }
            </div>
          <div className="pressword-api-display-exit" onClick={this.showApi}>
            Exit Display
          </div>
           </div>)}
      {this.state.ctas && !this.state.show && <div className="pressword-api-ctas">
          <span className="pressword-cta-btn" onClick={this.showApi}>Display</span>
          <span>|</span>
          <span className="pressword-cta-btn" onClick={this.handleChange}>Edit</span>
          <span>|</span>
          <span className="pressword-cta-btn" onClick={this.handleActivation}>{active === 'true' ? 'Deactivate' : 'Activate'}</span>
          <span>|</span>
          <span className="pressword-cta-btn" onClick={this.handleDelete}>Delete</span>
        </div>}
      </div>
    );
  }
}

// Api.propTypes = {
//   name: PropTypes.string,
//   uri: PropTypes.string
// };

const mapStateToProps = ({ apis }) => ({
  apis
})

const mapDispatchToProps = dispatch => ({
  deleteApi: input => dispatch(deleteApiAction(input)),
  postApi: input => dispatch(postApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Api);
