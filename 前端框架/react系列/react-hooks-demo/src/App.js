import React,{useState, useEffect} from 'react';
// import {FunctionPage} from './pages/FunctionPage';
// import {ClassPage} from './pages/ClassPage';
// import Message from './pages/Message';
// import Search from './pages/search/Parent';
// import IfTest from './pages/effect/IfTest';
import './App.css';

function App() {
  const [count,setCount] = useState(1);
  // const [isEmpty,setIsEmpty] = useState(true);
  // useEffect(()=>{
  //   setTimeout(()=>setIsEmpty(false),2000);
  // },[])
  return (
    <div className="App">
        <button onClick={()=>setCount(value=>value+value)}>change count</button>
        <div>count:{count}</div>
        {/* <ClassPage count={count}/>
        <FunctionPage count={count}/>
        <Message/>
        <Search/>
        <IfTest isEmpty={isEmpty}/> */}
    </div>
  );
}

export default App;
