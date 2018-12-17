import React from 'react';

export default class ContinueButton extends React.Component {

    render() {
        return (
            <button className='continue-button' onClick={this.props.onClick}>
                Continue
            </button>
        );
    }
}