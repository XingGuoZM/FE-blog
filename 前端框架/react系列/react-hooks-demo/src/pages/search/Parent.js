import React,{useState} from 'react';
import Child from './Child';
import {fetchData} from './fetchData';

export default function Parent(){
  const [query,setQuery] = useState('');
  const queryData =()=>{
    return fetchData(query);
  }
  return <>
  <input onChange = {(e)=>setQuery(e.target.value)} query={query}/>
  <Child queryData={queryData} query={query}/>
  </>
}