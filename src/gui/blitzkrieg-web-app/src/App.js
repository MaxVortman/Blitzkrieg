import React, { Component } from 'react';
import './App.css';
import logo from './img/blitzkrieg-text.png'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <img className='header-logo' src={logo} alt='logo' />
        </header>
        <div className='app-body'>
          <textarea className='text-field' readOnly='true' />
          <div className='app-submit-query'>
            <input className="query-field" type='text' placeholder='Type a text...' />
            <button className='submit-query-btn'>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
