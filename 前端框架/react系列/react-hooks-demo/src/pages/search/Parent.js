import React,{useState,useCallback} from 'react';
import Child from './Child';
import {fetchData} from './fetchData';

export default function Parent(){
  const [query,setQuery] = useState('');
  const queryData =useCallback(()=>{
    return fetchData(query);
  },[query])
  return <>
  <input onChange = {(e)=>setQuery(e.target.value)} query={query}/>
  <Child queryData={queryData} query={query}/>
  </>
}