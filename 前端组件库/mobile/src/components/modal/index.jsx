import React,{Component}from 'react';
import './index.css';

class Modal extends Component{
  constructor(){

  }
  init(){
    
  }
  render(){
    const {Children} = this.props;
    
    // const {visible}=this.state;
    return <div className="modal-wrap" >
      <div className="modal-content">
        <Children/>
      </div>
    </div>
  }
}
export default Modal;