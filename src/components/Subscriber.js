import React, { Component } from 'react';
import ConstructSubscriber from './ConstructSubscriber'
import { connect } from 'react-redux'
import { deleteApiAction } from '../subscribersActions'
import PropTypes from 'prop-types';


class Subscriber extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  getInitialState() {
    return {
      edit: false
    }
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  handleChange(e) {
    this.setState({edit: !this.state.edit})
  }

  handleDelete(e) {
    this.props.deleteApi({
      name: this.props.name
    })
  }

  render() {
    const { name, uri, properties, hooks, api } = this.props;
    return (
      <div className="pressword-subscriber-container">
      { this.state.edit ?
        <ConstructSubscriber api={api} finishEdit={this.handleChange} /> : (
        <div className="pressword-subscriber">
          <p><span className="pressword-title">Name:</span> {name}</p>
          <p><span className="pressword-title">URI:</span> {uri}</p>
          <div className="pressword-subscriber-props">
            <p className="pressword-title">Properties:</p>
            { Array.isArray(properties) ? properties.map(prop => {
              return (
                <pre>{` {\n name: ${prop.name},\n value: ${prop.value}\n }`}</pre>
              )
            }) : 'No properties configured'}
          </div>

          <div className="pressword-subscriber-hooks">
            <p className="pressword-title">Hooks:</p>
            { hooks && hooks.length ?
              <pre>{`${hooks}`}</pre>
            : 'No hooks configured'}
          </div>
        </div>)}
        { 
        !this.state.edit ?
        (<div className="pressword-subscriber-ctas">
          <span className="pressword-change-btn pressword-btn" onClick={this.handleChange}>Edit API</span>
          <span className="pressword-remove-api-btn pressword-btn" onClick={this.handleDelete}>Delete API</span></div>) : null
        }
      </div>
    );
  }
}

// Subscriber.propTypes = {
//   name: PropTypes.string,
//   uri: PropTypes.string
// };

const mapStateToProps = ({ subscribers }) => ({
  subscribers
})

const mapDispatchToProps = dispatch => ({
  deleteApi: input => dispatch(deleteApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber);
