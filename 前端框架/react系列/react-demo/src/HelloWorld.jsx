import React, { useEffect, useState } from 'react';
import A from './components/A';
import B from './components/B';

export default function HelloWorld() {
  const [msg,setMsg]=useState('A');
  const onClick=()=>{
    setMsg('click A');
  }
  return <div>
    <A msg={msg} onClick={onClick}/>
    <B/>
  </div>
}