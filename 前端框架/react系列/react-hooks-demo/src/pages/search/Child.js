import React, { useEffect,useState } from 'react';

export default function Child(props){
  console.log('rerender')
  const {query,queryData} = props;
  const [result,setResult] = useState('');

  useEffect(()=>{
    queryData().then(res=>setResult(res));
  },[queryData])
  return <>
    <div>query:{query}</div>
    <div>result:{result}</div>
  </>
}