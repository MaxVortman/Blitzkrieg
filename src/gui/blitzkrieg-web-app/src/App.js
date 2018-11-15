import React from 'react';
import './App.css';
import logo from './img/blitzkrieg-text.png'
import * as prologInteractor from './prologInteractor';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textarea: '',
      input: ''
    }
  }

  submitBtnHandleClick = () => {
    this.setState(state => {
      return {
        textarea: prologInteractor.postMessage(state.input)
      }
    }
    );
  }

  handleInputChange = (e) =>{
    this.setState({input: e.target.value});
  }

  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <img className='header-logo' src={logo} alt='logo' />
        </header>
        <div className='app-body'>
          <textarea className='text-field' readOnly='true' value={this.state.textarea} />
          <div className='app-submit-query'>
            <input className='query-field' type='text' placeholder='Type a text...' value={this.state.input} onChange={this.handleInputChange} />
            <button className='submit-query-btn' onClick={this.submitBtnHandleClick}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
