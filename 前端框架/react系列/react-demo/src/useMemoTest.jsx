import React,{useMemo,useState} from 'react';
import Countdown from './components/Countdown';
import Clickable from './components/Clickable';
function UseMemoTest (){
  const [count,setCount]= useState(0);
  const [count1,setCount1] = useState(0);
  const {hour,minute,second} = useMemo(()=>{
    console.log(count)
    return {hour:1,minute:1,second:count}
  },[count]);
  const handleClick=()=>{
    setCount(count-1);
  }
  const handleClick1 = () =>{
    setCount1(count1+1);
  }
  return <div>
    <Countdown onClick={handleClick} hour={hour} minute={minute} second={second}/>
    <Clickable onClick={handleClick1}>Clickable</Clickable>
  </div>
}
export default UseMemoTest;