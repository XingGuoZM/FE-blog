import React,{useState, useEffect} from 'react';
import './App.css';
// 表格瀑布流组件
// import WaterFall from './components/waterfall'
// canvas画k线图
import KCanvas from './components/kcanvas'

//无限加载演示
import ScrollList from './components/scrollList/index'

const kcanvas='k'
const waterfall='w'
function App() {
  const [flag,setFlag]=useState(0)
  useEffect(()=>{
    setFlag(waterfall)
  },[])
  const activeStyle={
    backgroundColor:'#ff7d1a',
    color:'#fff'
  }
  return (
    <div className="App">
      <header className="head">
        <div className='nav' style={flag===waterfall?activeStyle:null} onClick={()=>setFlag(waterfall)}>无限滚动加载</div>
        <div className='nav' style={flag===kcanvas?activeStyle:null} onClick={()=>setFlag(kcanvas)}>canvas K线图</div>
      </header>
      {flag===kcanvas?<KCanvas></KCanvas>:<ScrollList></ScrollList>}
    </div>
  );
}

export default App;
