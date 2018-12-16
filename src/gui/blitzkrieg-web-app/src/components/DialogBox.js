import React from 'react';

export var writeText;

export default class DialogBox extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    componentWillMount(){
        writeText = (text) => {
            this.setState({value: text});
        }
       }

    render() {
      return (
        <div className='text-container'>
          <textarea className='text-field' readOnly={true} value={this.state.value} />
        </div>
      );
    }
  }