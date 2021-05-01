import React,{Component}from 'react';
import './index.css';

class Modal extends Component{
  render(){
    console.log(this.props)
    return <div className="modal-wrap">
      <div className="modal-content">{this.props.children}</div>
    </div>
  }
}
export default Modal;