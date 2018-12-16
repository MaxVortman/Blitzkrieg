import React from 'react';
import DialogBox from './DialogBox';
import TextInput from './TextInput';

export default class Body extends React.Component {
    
    render() {
      return (
        <div className='app-body'>
        <DialogBox/>
        <TextInput/>
      </div>
      );
    }
  }