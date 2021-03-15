import {useState} from 'react';


function DragDemo(){

  const [top,setTop] = useState(0);
  const [left,setLeft] = useState(0);

  function touchStart(e) {
    console.log('start')
  }

  function touchMove(e){
    const {clientX,clientY}=e.targetTouches[0];
    setTop(clientY);
    setLeft(clientX);
  }

  function touchEnd(e){
    // console.log('end',e.target);

  }

  return <div 
    id = 'targetDiv'
    style = {{width:'1rem',height:'1rem',border:'#ccc solid 1px',position:'absolute',top:top+'px',left:left+'px'}} 
    onTouchStart = {touchStart}
    onTouchMove = {touchMove}
    onTouchEnd = {touchEnd}>

  </div>
}

export default DragDemo;