import './App.css';
import { viewport } from './util';
// import ScrollList from './scroll';
// import DragDemo from './components/drag';
import {ModalManager, Tab, ScrollList, DragDemo } from './components';
import { tabProps } from './config';
function App() {
  viewport();
  const dom = <div style={{backgroundColor:'#fff'}}>hello</div>
  const mm = ModalManager(dom);
  // Modal.regist({key:'modal1'})
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      {/* <Tab {...tabProps} /> */}
      {/* <Modal/> */}
    </div>
  );
}

export default App;
