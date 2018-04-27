import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      isChecked: false,
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    console.log('check change', this)
    const { handleCheckboxChange, label, type } = this.props;


    this.setState(({ isChecked }) => ({
        isChecked: !isChecked,
      }));

    handleCheckboxChange(type, label);
  }

  componentDidMount() {
    if(this.props.hooks) {
      this.fillBoxesOnEdit();
    }
  }

  fillBoxesOnEdit() {
    const { wpHooks, hooks, type, label } = this.props;
    if (wpHooks[type][label].filter(hook => hooks.indexOf(hook) > -1).length) {
      this.toggleCheckboxChange()
    }
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
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
