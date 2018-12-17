import React from 'react';
import DialogBox from './DialogBox';
import Input from './Input';

export default class Body extends React.Component {
  render() {
    return (
      <div className='app-body'>
        <DialogBox />
        <Input />
      </div>
    );
  }
}