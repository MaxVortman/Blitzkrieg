import React from 'react';

export default class TextInput extends React.Component {
    render() {
        return (
            <input className='query-field'
                type='text'
                placeholder='Type a text...'
                value={this.props.input}
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress} />
        );
    }
}