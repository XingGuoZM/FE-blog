import React , { useState }from 'react'
import './index.css'
import { useEffect} from 'react'
let width=500
let reqAni
let start=Date.now()
function Move(props){
  let [index,setIndex]=useState(0)
  let [left,setLeft]=useState(width)
  let len=props.data.length
  
  function step(){
    let next=Date.now();
    let process=(next-start)/3;
    let resLeft=process>width*(index+1)?width*(index+1):process
    setLeft(resLeft)
    console.log(parseInt(process),index)
    if(process<width*(index+1)){
      reqAni=window.requestAnimationFrame(step)
    }
  }
  // 监听left变化
  useEffect(()=>{},[left])
  const initDom=function(){
    setLeft(width)
    setIndex(0)
    // window.cancelAnimationFrame(reqAni)
  }
  // 点击滚动
  const handleClick=function(type){
    let currIndex=index
    switch(type){
      case 'left':
        currIndex= index > len-1 ? 0 : ( ++index )
        // currIndex=++index
        reqAni=window.requestAnimationFrame(step)
        break;
      case 'right':
        currIndex= index < 1 ? len-1 : (--index)
        break;
      default:
        break;
    }
    // setIndex(currIndex)
    if(currIndex===len+1) initDom()
    else setIndex(currIndex)
    // window.location.hash=`#${currIndex}`; 
  }

  let colors=['#800000','#008000','#008080']
  let dataDom=props.data.map(item=><section className='page' style={{backgroundColor:colors[item]}} key={item}>{item}</section>)

  return <div className='container'>
    <div className='left-arrow' onClick={()=>handleClick('left')}>left</div>
    <div className='page-wrapper' style={{transform: `translateX(-${left}px)`}}>
      <section className='page' style={{backgroundColor:colors[2]}} key={props.data[len-1]}>{props.data[len-1]}</section>
      {dataDom}
      <section className='page' style={{backgroundColor:colors[0]}} key={props.data[0]}>{props.data[0]}</section>
    </div>
    <div className='right-arrow' onClick={()=>handleClick('right')}>right</div>
  </div>
}

export default Move