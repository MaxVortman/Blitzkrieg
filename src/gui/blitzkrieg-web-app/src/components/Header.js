import logo from '../img/blitzkrieg-text.png'
import React from 'react';

export default class Header extends React.Component {
    render() {
      return (
          <header className='app-header'>
            <img className='header-logo' src={logo} alt='logo' />
          </header>
      );
    }
  }