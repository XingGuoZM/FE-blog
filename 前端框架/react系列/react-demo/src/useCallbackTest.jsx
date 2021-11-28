import {useCallback,useState} from 'react';


export default function CallbackDemo (){
  const [count1,setCount1] = useState(0);
  const [count2,setCount2] = useState(0);
  const [count3,setCount3] = useState(0);
  const handleClick1 = ()=>{
    setCount1(count1+1)
  };
  const handleClick2 = useCallback(()=>{
    setCount2(count2+1)
  },[count2]);
  const handleClick3 = ()=>{
    setCount3(count3+1)
  };
  return <div>
    <div onClick={handleClick1}>{`click me ${count1}`}</div>
    <div onClick={handleClick2}>{`click me ${count2}`}</div>
    <div onClick={handleClick3}>{`click me ${count3}`}</div>
  </div>
}