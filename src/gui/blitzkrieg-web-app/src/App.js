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
    prologInteractor.startGame().then(res => {
      this.setState({
        textarea: res,
        input: ''
      });
    });
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      prologInteractor.postMessage(this.state.input).then(res => {
        this.setState(
          {
            textarea: res,
            input: ''
          });
      });
    }
  }

  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <img className='header-logo' src={logo} alt='logo' />
        </header>
        <div className='app-body'>
          <div className='text-container'>
            <textarea className='text-field' readOnly={true} value={this.state.textarea} />
          </div>
          <div className='app-submit-query'>
            <input className='query-field'
              type='text'
              placeholder='Type a text...'
              value={this.state.input}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
