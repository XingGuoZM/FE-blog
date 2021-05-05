import React,{Component}from 'react';
import './index.css';

class Modal extends Component{
  constructor(){
    super();
  }
  init(){
    
  }
  render(){
    const {children} = this.props;
    
    // const {visible}=this.state;
    return <div className="modal-wrap" >
      <div className="modal-content">
      {children}
      </div>
    </div>
  }
}
export default Modal;