import {useState, useEffect} from 'react';
import './index.css';
/**
 * 拖拽组件实现点
 * 1. 
 */

function Dragger(){

  const [y,setY] = useState(null);
  const [x,setX] = useState(null);
  const [flag,setFlag] = useState(false);

  function handleDown(e){
    setFlag(true)
  }
  function handleMove(e){
    const dragger = document.querySelector('.dragger');
    const disX = e.clientX -  dragger.offsetLeft;
    const disY = e.clientY - dragger.offsetTop;
    if(flag && e.clientX>=25 && e.clientX >=25 && e.clientX<=475 && e.clientY<=475){
      setY(disY);
      setX(disX);
    }
  }
  function handleUp(e){
    setFlag(false);
  }

  return <div className="drag-wrap" >
      <section className="src-wrap" onMouseMove={(e)=>handleMove(e)}>
        <div className="dragger" 
          style={{transform:`translate(${x}px,${y}px)`}}
          onMouseDown={(e)=>handleDown(e)}
        
          onMouseUp={(e)=>handleUp(e)}/>
      </section>
    </div>
}

export default Dragger;