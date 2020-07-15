import React , { useState }from 'react'
import './index.css'
import { useEffect} from 'react';
let leftTimer=null
let rightTimer=null
function Slider(props){
  let [index,setIndex]=useState(0)
  let [left,setLeft]=useState(0)
  let [direction,setDirection]=useState('left')
  let len=props.data.length

  function startAnimation(type){
    if(type==='left'){
      leftTimer=setInterval(()=>{
        setLeft(left=>left-100)
      },100)
    }else if(type==='right') {
      rightTimer=setInterval(()=>{
        setLeft(left=>left+100)
      },100)
    }
  }
  useEffect(()=>{
    console.log(left,index,direction)
    if(left<-index*500 && direction==='left'){
      setLeft(-500*index)
      return ()=>clearInterval(leftTimer)
    }else if(left>-index*500 && direction==='right'){
      setLeft(-500*index)
      return ()=>clearInterval(rightTimer)
    }
  },[index,left])
  
  // 点击滚动
  const handleClick=function(type){
    let currIndex=index
    switch(type){
      case 'left':
        currIndex= index > len-2 ? 0 : ( ++index )
        setDirection(type)
        startAnimation(type)
        break;
      case 'right':
        currIndex= index < 1 ? len-1 : (--index)
        if(currIndex!==len-1) startAnimation(type)
        setDirection(type) 
        
        break;
      default:
        break;
    }
    setIndex(currIndex)
    window.location.hash=`#${currIndex}`; 
  }
  // 监听锚点变化
  window.addEventListener('hashchange',()=>{
    let sec=window.location.hash && window.location.hash.slice(1)
    if(parseInt(sec)>len-1) window.location.hash=`#${len-1}`
    if(parseInt(sec)<0) window.location.hash=`#${0}`
    else {
      setIndex(parseInt(sec))
    }
    setLeft(-index*500)
  })

  let colors=['#C1CDC1','#8B3E2F','#8470FF','#79CDCD','#008B00','#8B658B']
  let dataDom=props.data.map(item=><section className='page' style={{backgroundColor:colors[(item+1)%5]}} key={item}>{item}</section>)

  return <div className='container'>
    <div className='left-arrow' onClick={()=>handleClick('left')}>left</div>
    <div className='page-wrapper' style={{transform: `translateX(${left}px)`}}>
      {dataDom}
    </div>
    <div className='right-arrow' onClick={()=>handleClick('right')}>right</div>
  </div>
}

export default Slider