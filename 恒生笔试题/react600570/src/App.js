import React from 'react';
import './App.css';
// 表格瀑布流组件
import WaterFall from './components/waterfall'
// canvas画k线图
import KCanvas from './components/kcanvas'

//无限加载演示
import ScrollList from './components/scrollList/index'
function App() {
  return (
    <div className="App">
      <ScrollList></ScrollList>
      {/* <WaterFall></WaterFall> */}
      {/* <KCanvas></KCanvas> */}
    </div>
  );
}

export default App;
