import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVisibilityAction } from '../uiActions'

class Header extends Component {

  constructor(props) {
    super(props)
    this.setVisibility = this.setVisibility.bind(this)
  }

  setVisibility(e, route) {
    console.log('wtf setVisibility', route, this.props)
    this.props.changeVisibility(route)
  }


  setNavStatus(route, active) {
    return active === route ? 'pressword-active-link' : '';
  }

  render() {
    return (
      <header className="pressword-header">
        <nav className="pressword-nav">
          <ul className="pressword-nav-ul">
            { ['construct', 'configure'].map((route, idx) => {
              let upper = route.charAt(0).toUpperCase() + route.slice(1) + ' Apis';
              return (
                <li
                key={`${route}-${idx}`}
                className={`pressword-nav-link ${this.setNavStatus(route, this.props.ui.routeVisible)}`}
                onClick={(e) => this.setVisibility(e, route)}>{upper}</li>
            )})}
          </ul>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = ({ ui }) => ({
  ui
})

const mapDispatchToProps = dispatch => ({
  changeVisibility: input => dispatch(setVisibilityAction(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
