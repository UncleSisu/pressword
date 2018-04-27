import React, { Component } from 'react'
import Checkbox from './Checkbox'
import wpHooks from '../utils/wpHooks'

const actions = Object.keys(wpHooks.Post);
const types = Object.keys(wpHooks);

class CheckboxGroup extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  getInitialState() {
    return {}
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  componentWillMount() {
    this.selectedCheckboxes = types.reduce((acc, curr) => {
      acc[curr] = new Set()
      return acc;
    }, {})
  }

  toggleCheckbox(type, label) {
    if (this.selectedCheckboxes[type].has(label)) {
      this.selectedCheckboxes[type].delete(label);
    } else {
      this.selectedCheckboxes[type].add(label);
    }

    const hooks = Object.keys(this.selectedCheckboxes)
      .reduce((acc, curr) => {
        let acts = Array.from(this.selectedCheckboxes[curr]);
        if (acts.length) {
          acts.forEach(act => {
            acc = acc.concat(wpHooks[curr][act]);
          })
        }
        return acc;
      }, []);

    this.props.submitHooks(hooks);
  }

  render() {
    return (
      <div className="pressword-checkgroup">
      {types.map(type => (
          <div key={type} className="pressword-check-typegroup">
            <h2>{type}</h2>
            <div className="pressword-check-actiongroup">
              {actions.map( action => (
                <Checkbox
                  wpHooks={wpHooks}
                  hooks={this.props.hooks}
                  label={action}
                  type={type}
                  handleCheckboxChange={this.toggleCheckbox}
                  key={action}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

}

// CheckboxGroup.propTypes = {
//   name: PropTypes.string,
//   uri: PropTypes.string
// };

export default CheckboxGroup;
