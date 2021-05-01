import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';

export default (props)=> {

  if(!document.querySelector('#modalBox')){
    const dom =document.createElement('div');
    dom.id='modalBox';
    ReactDOM.render(
      <Modal children={props} />,
      document.body.appendChild(dom)
    );
  }
}