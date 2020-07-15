import React from 'react';
import Slider from './slider/index'
function App() {
  let arr=[0,1,2,3]
  return (
    <div className="App">
      <Slider data={arr}></Slider>
    </div>
  );
}

export default App;
