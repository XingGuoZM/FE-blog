import React,{Component}from 'react';
import './index.css';

class Modal extends Component{
  init(){
    
  }
  render(){
    return <div className="modal-wrap">
      <div className="modal-content">{this.props.children}</div>
    </div>
  }
}
export default Modal;