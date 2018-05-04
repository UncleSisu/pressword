import React, { Component } from 'react';
import ConstructApi from './ConstructApi'
import Properties from './Properties'
import { connect } from 'react-redux'
import { deleteApiAction } from '../store/actions/apisActions'
import PropTypes from 'prop-types';


class Api extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleActivation = this.handleActivation.bind(this);
    this.showApi = this.showApi.bind(this);
    // this.handleCTAdisplay = this.handleCTAdisplay.bind(this);
  }

  getInitialState() {
    return {
      edit: false,
      show: false,
      ctas: false,
      // ischecked: false
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  handleChange(e) {
    this.setState({
      edit: !this.state.edit
    })
    this.handleCTAdisplay(!this.state.ctas);
    if (this.state.show) {
      this.setState({show: false})
    }
  }

  showApi(e) {
    this.setState({show: !this.state.show})
  }

  handleCTAdisplay(view) {
    this.setState({ctas: view})
  }

  handleActivation(e) {
    console.log('hi mom deactivate please', this.props.api)
    const active = this.props.active === 'true' ? false : true;
    this.props.handleUpdate(this.props.api, 'active', active);
  }

  handleDelete(e) {
    this.props.deleteApi({
      name: this.props.name
    })
  }

  render() {
    const { name, uri, properties, hooks, api, active } = this.props;
    return (
      <div className="pressword-api-container" onMouseEnter={() => !this.state.edit && this.handleCTAdisplay(true)} onMouseLeave={() => this.handleCTAdisplay(false)}>

        <div className="pressword-inline-api">
          <input
            type="checkbox"
            value=""
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
  deleteApi: input => dispatch(deleteApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Api);
