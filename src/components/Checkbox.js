import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor(props){
    super(props)
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  componentDidMount() {
    if(this.props.hooks) {
      this.fillBoxesOnTrigger();
    }
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, label, type } = this.props;

    this.props.setBoxState(type, label)

    handleCheckboxChange(type, label);
  }

  fillBoxesOnTrigger() {
    const { wpHooks, hooks, type, label } = this.props;
    if (wpHooks[type][label].filter(hook => hooks.indexOf(hook) > -1).length) {
      this.toggleCheckboxChange()
    }
  }

  render() {
    const { label, checked } = this.props;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={checked}
            onChange={this.toggleCheckboxChange}
          />
          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
