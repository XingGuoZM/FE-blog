import React , { useState }from 'react'
import './index.css'
import { useEffect} from 'react';
let timer
function Slider(props){
  let [index,setIndex]=useState(0)
  // let [left,setLeft]=useState(0)
  let len=props.data.length


  // function startAnimation(){
  //     timer=setInterval(()=>{
  //       console.log(left)
  //       setLeft(left=>{
  //         return left-50
  //       })

  //     },100)
  // }
  useEffect(()=>{
    // if(left>-450){
    //   return ()=>clearInterval(timer)
    // }

  },[index])
  
  // 点击滚动
  const handleClick=function(type){
    let currIndex=index
    switch(type){
      case 'left':
        currIndex= index > len-2 ? 0 : ( ++index )
        // startAnimation()
        break;
      case 'right':
        currIndex= index < 1 ? len-1 : (--index)
        // startAnimation(type)
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
    else setIndex(parseInt(sec))
  })

  let colors=['#C1CDC1','#8B3E2F','#8470FF','#79CDCD','#008B00','#8B658B']
  let dataDom=props.data.map(item=><section className='page' style={{backgroundColor:colors[(item+1)%5]}} key={item}>{item}</section>)

  return <div className='container'>
    <div className='left-arrow' onClick={()=>handleClick('left')}>left</div>
    <div className='page-wrapper' style={{left: -500*index+'px'}}>
      {dataDom}
    </div>
    <div className='right-arrow' onClick={()=>handleClick('right')}>right</div>
  </div>
}

export default Slider