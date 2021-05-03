import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';

export default class modalManager { 
  node=document.body;
  compMap=new Map();
  stack=[];
  regist(props){
    this.compMap.set()
    if(props.dom) this.node=props.dom;
      ReactDOM.render(
        <Modal children={props} />,
        this.node
      );
  }

  showModal(){

  }

}