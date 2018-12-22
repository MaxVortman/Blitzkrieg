import React from 'react';

export var writeText;
export var writeData;

export default class DialogBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: ''
        }
    }

    componentWillMount() {
        writeText = (text) => {
            this.setState({ text: text });
        }
        writeData = (data) => {
            this.setState({ data: data });
        }
    }

    render() {
        return (
            <div className='text-container'>
                <textarea className='text-field' readOnly={true} value={this.state.text} />
                <textarea className='data-field' readOnly={true} value={this.state.data} />
            </div>
        );
    }
}