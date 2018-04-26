import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteApiAction } from '../subscribersActions'
import PropTypes from 'prop-types';


class Subscriber extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   visible: null,
    //   res: null
    // }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log('Subscriber has mounted');
  }

  emptyResponses() {
    // return this.state.res ? this.setState({ res: null }) : null;
  }

  handleEdit(e) {
    console.log('check test', e);
  }

  handleDelete(e) {
    // console.log('handleDelete', this.props);
    this.props.deleteApi({
      name: this.props.name
    })
  }

  render() {
    const { name, uri, properties, hooks } = this.props;
    return (
      <div className="pressword-api-item">
        <p><span className="pressword-title">Name:</span> {name}</p>
        <p><span className="pressword-title">URI:</span> {uri}</p>
        <div className="pressword-api-item-props">
          <p className="pressword-title">Properties:</p>
          { Array.isArray(properties) ? properties.map(prop => {
            return (
              <pre>
                {`
                {
                  name: ${prop.name},
                  value: ${prop.value}
                }
                `}
              </pre>
            )
          }) : 'No properties configured'}
        </div>

        <div className="pressword-api-item-hooks">
          <p className="pressword-title">Hooks:</p>
          { hooks.length ?
            <pre>
              {`
                ${hooks}
              `}

            </pre>
          : 'No hooks configured'}
        </div>
        <div className="api-item-actions">
          <span className="pressword-edit-btn api-btn" onClick={this.handleEdit}>Edit API</span>
          <span className="pressword-remove-api-btn api-btn" onClick={this.handleDelete}>Delete API</span>
        </div>
      </div>
    );
  }
}

Subscriber.propTypes = {
  name: PropTypes.string,
  uri: PropTypes.string
};

const mapStateToProps = ({ subscribers }) => ({
  subscribers
})

const mapDispatchToProps = dispatch => ({
  deleteApi: input => dispatch(deleteApiAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber);
