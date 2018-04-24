import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  // console.log('see header props change', props.stasis)
  // <img src={this.props.logo} alt="pressword logo" />

  // <header id="nav-header">
  //   <div className="nav-logo"><Link to="/"></Link></div>
  //   <div className="nav-menu-button">Menu</div>
  // </header>
  return (
    <header className="header">
      <div className="nav-background">
        <div id="nav-container">
          <nav>
            <ul className="nav-ul">
              { ['add', 'remove', 'configure'].map((route, idx) => {
                const upper = route.charAt(0).toUpperCase() + route.slice(1);
                return <li key={idx} className="nav-link"><Link to={`/${route}`}>{upper}</Link></li>
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
