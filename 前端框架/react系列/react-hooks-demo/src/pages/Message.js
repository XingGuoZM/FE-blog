import React,{useState} from 'react';

export default function Message(){
  const [msg,setMsg] = useState(0);
  const showMsg=()=>{
    console.log(msg);
  }
  const handleSend = ()=>{
    setTimeout(showMsg,3000);
  }
  const changeMsg = (e)=>{
    setMsg(e.target.value);
  }
  return <div>
  <input value={msg} onChange={changeMsg}/>
  <button onClick={handleSend}>send</button>
  </div>
}