import {useEffect,useRef,useState} from 'react';

export default function DebounceThrottle(){
  const [count,setCount] = useState(0);
  const countRef = useRef(0);
  const timerRef=useRef(-1);
  const throttleRef=useRef(0);
  // 防抖
  const debounce = (fn,delay)=>{
    if(timerRef.current===-1){
      timerRef.current = window.setTimeout(fn,delay);
    }else{
      window.clearTimeout(timerRef.current);
      timerRef.current=-1;
    }
  }
  // 截流
  const throttle =(fn,delay)=>{
    // throttleRef.current=performance.now();
    if(performance.now()-throttleRef.current>=delay){
      fn();
      throttleRef.current=performance.now();
    }
  }
  const handleClick=()=>{
    setCount(value=>value+1);
    countRef.current+=1;
    throttle(()=>{
      console.log('throttle',countRef.current);
    },3000)
  }

  return <div>
    <div>{count}</div>
    <button onClick={handleClick}>click me</button>
  </div>
}