import React ,{useEffect,useState} from 'react';

export default function IfTest(props){
  const {isEmpty} = props;
  useEffect(()=>{
    setNum(1)
    console.log('report content',num);
  
  },[]);
  const [num,setNum] = useState();
  if(isEmpty){
    return <div>empty</div>
  }
  return <div>content</div>
}