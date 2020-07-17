import React from 'react';
import './index.css'
let start
class Move extends React.Component{
  constructor(props){
    super(props);
    this.state={
      left:0
    }
    this.startMove=this.startMove.bind(this)
  }
  startMove(next){
    if(!start) start=next
    let process=next-start
    this.setState({left:process})
    if(process<400){
      requestAnimationFrame(this.startMove)
    }
  }
  handleClick(){
    requestAnimationFrame(this.startMove)
  }
  render(){
    const {left} = this.state
    return <div className='wrapper' style={{left:`${left}px`}} onClick={()=>this.handleClick()}></div>
  }
}

export default Move