import React from 'react';
import './App.css';
import WaterFall from './components/waterfall'
import KCanvas from './components/kcanvas'
function App() {
  return (
    <div className="App">
      <WaterFall></WaterFall>
      <KCanvas></KCanvas>
    </div>
  );
}

export default App;
