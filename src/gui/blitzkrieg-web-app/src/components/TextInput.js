import React from 'react';
import * as prologInteractor from '../prologInteractor';
import {writeText} from './DialogBox';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            state: ''
        }
        prologInteractor.startGame().then(res => {
            this.updateState(res);
        });
    }

    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            prologInteractor.postMessage(this.state.input, this.state.state).then(res => {
                this.updateState(res);
            });
        }
    }

    updateState = (res) =>{
        this.setState({
            input: '',
            state: res.state
        });
        writeText(res.text);
    }

    render() {
        return (
            <div className='app-submit-query'>
                <input className='query-field'
                    type='text'
                    placeholder='Type a text...'
                    value={this.state.input}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyPress} />
            </div>
        );
    }
}