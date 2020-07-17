import React , { useState }from 'react'
import './index.css'
import { useEffect} from 'react'



function Slider(props){
  let [index,setIndex]=useState(0)
  let [left,setLeft]=useState(0)
  let len=props.data.length
  let start=null
  function step(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    if(progress>500*index) {
      setLeft(500*index)
      start=timestamp
    }
    else setLeft(progress)
    console.log(start,timestamp)
    if (progress < 500*index) {
      window.requestAnimationFrame(step);
    }
  }
  
  useEffect(()=>{},[index])
  // 点击滚动
  const handleClick=function(type){
    let currIndex=index
    switch(type){
      case 'left':
        currIndex= index > len-2 ? 0 : ( ++index )
        break;
      case 'right':
        currIndex= index < 1 ? len-1 : (--index)
        break;
      default:
        break;
    }
    window.requestAnimationFrame(step);
    setIndex(currIndex)
    window.location.hash=`#${currIndex}`; 
  }
  // 监听锚点变化
  window.addEventListener('hashchange',()=>{
    let sec=window.location.hash && window.location.hash.slice(1)
    if(parseInt(sec)>len-1) window.location.hash=`#${len-1}`
    if(parseInt(sec)<0) window.location.hash=`#${0}`
    else setIndex(parseInt(sec))
  })

  let colors=['#C1CDC1','#8B3E2F','#8470FF','#79CDCD','#008B00','#8B658B']
  let dataDom=props.data.map(item=><section className='page' style={{backgroundColor:colors[(item+1)%5]}} key={item}>{item}</section>)

  return <div className='container'>
    <div className='left-arrow' onClick={()=>handleClick('left')}>left</div>
    <div className='page-wrapper' style={{transform: `translateX(-${left || index*500}px)`}}>
      {dataDom}
    </div>
    <div className='right-arrow' onClick={()=>handleClick('right')}>right</div>
  </div>
}

export default Slider