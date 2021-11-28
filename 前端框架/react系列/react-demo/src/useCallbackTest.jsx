import {useCallback,useState} from 'react';
import Clickable from './components/Clickable';

export default function CallbackDemo (){
  const [count1,setCount1] = useState(0);
  const [count2,setCount2] = useState(0);
  const handleClick1 = ()=>{
    setCount1(count1+1)
  };
  const handleClick2 = useCallback(()=>{
    console.log('hanldeClick2');
    setCount2(count2+1)
  },[count2]);
  return <div>
    <Clickable onClick={handleClick1}>click 1</Clickable>
    <Clickable onClick={handleClick2}>click 2</Clickable>
  </div>
}