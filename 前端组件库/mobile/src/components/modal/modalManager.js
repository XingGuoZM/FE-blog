import React,{Component}from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';

export default class modalManager { 
  node=document.body;
  compMap=new Map();
  visible=false;
  stack=[];
  regist(props){
    // if(document.querySelector('#modal-box')){
    //   return 
    // }
    const div= document.createElement('div');
    div.id='modal-box';
    document.body.appendChild(div);
    for(let item of Object.entries(props)){
      this.compMap.set(item[0],item[1]);
    }
    // this.init();
  }

  init(){
    for(let [key,value] of this.compMap){
      // const Item = value;
      ReactDOM.render(
        <Modal children={value} />,
        document.querySelector('#modal-box')
      );
    }
  }

  showModal(){
     ReactDOM.render(
      <Modal Children={this.compMap.get('modal1')} />,
      document.querySelector('#modal-box')
    );
  }
  closeModal(){
    this.visible=false;
  }
  closeAll(){

  }
}