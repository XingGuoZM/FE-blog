import './App.css';
import { viewport } from './util';
// import ScrollList from './scroll';
// import DragDemo from './components/drag';
import {Modal, Tab, ScrollList, DragDemo } from './components';
import { tabProps } from './config';
function App() {
  viewport();
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      {/* <Tab {...tabProps} /> */}
      <Modal/>
    </div>
  );
}

export default App;
