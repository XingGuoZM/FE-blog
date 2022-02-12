import React,{useState} from 'react';
import {FunctionPage} from './pages/FunctionPage';
import {ClassPage} from './pages/ClassPage';
import Message from './pages/Message';
import Search from './pages/search/Parent';
import './App.css';

function App() {
  const [count,setCount] = useState(1);
  return (
    <div className="App">
        <button onClick={()=>setCount(value=>value+value)}>change count</button>
        <div>count:{count}</div>
        <ClassPage count={count}/>
        <FunctionPage count={count}/>
        <Message/>
        <Search/>
    </div>
  );
}

export default App;
