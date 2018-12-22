import React from 'react';
import * as prologInteractor from '../prologInteractor';
import { writeText, writeData } from './DialogBox';
import ContinueButton from './ContinueButton';
import TextInput from './TextInput';
import { getStringifyPlayerData } from '../playerData';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            state: 'intro',
            isAction: true
        }
        this.readMessage();
    }

    readMessage = () => {
        prologInteractor.readMessage(this.state.state).then(res => {
            const isAction = res.have_action === "true";
            this.setState({
                isAction: isAction
            });
            if (!isAction)
                this.setState({ state: res.next_state });
            writeText(res.text);
        });
    }

    handleInputChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            prologInteractor.postMessage(this.state.input, this.state.state).then(res => {
                this.setState({
                    input: '',
                    state: res.state,
                    isAction: false
                });
                writeText(res.text);
                writeData(getStringifyPlayerData());
            });
        }
    }

    render() {
        return (
            <div className='app-submit-query'>
                {this.state.isAction
                    ? <TextInput onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} input={this.state.input} />
                    : <ContinueButton onClick={this.readMessage} />}
            </div>
        );
    }
}