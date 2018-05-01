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
    this.setBoxState = this.setBoxState.bind(this);
  }

  getInitialState() {
    return {
      boxes: this.initialBoxes()
    };
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.hooks.length && !nextProps.hooks.length) {
      this.resetState();
    }
  }

  componentWillMount() {
    this.selectedCheckboxes = types.reduce((acc, curr) => {
      acc[curr] = new Set()
      return acc;
    }, {})
  }

  initialBoxes() {
    return types.reduce((acc, curr) => {
      acc[curr] = actions.reduce((ac, cur) => {
        ac[cur] = false;
        return ac;
      }, {})
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

  setBoxState(type, label) {
    let {boxes} = this.state;
    let checked = boxes[type][label];
    boxes[type][label] = !checked;

    this.setState({boxes});
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
                  checked={this.state.boxes[type][action]}
                  setBoxState={this.setBoxState}
                  handleCheckboxChange={this.toggleCheckbox}
                  key={`checkbox-${action}-${type}`}
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
