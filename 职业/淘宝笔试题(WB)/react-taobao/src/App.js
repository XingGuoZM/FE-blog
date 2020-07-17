import React from 'react';
import Slider from './slider/index'
// import Move from './moveDemo/index'
function App() {
  let arr=[0,1,2,3]
  return (
    <div className="App">
      <Slider data={arr}></Slider>
      {/* <Move></Move> */}
    </div>
  );
}

export default App;
