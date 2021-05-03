import './App.css';
import { viewport } from './util';
// import ScrollList from './scroll';
// import DragDemo from './components/drag';
import {ModalManager, Tab, ScrollList, DragDemo } from './components';
import Modal1 from './pages/modal1';
import { tabProps } from './config';
function App() {
  viewport();
  const dom = <div style={{backgroundColor:'#fff'}}>hello</div>
  const mm = new ModalManager(dom);
  mm.regist({modal1:Modal1})
  // Modal.regist({key:'modal1'})
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      {/* <Tab {...tabProps} /> */}
      {/* <Modal/> */}
      <button>open</button>
    </div>
  );
}

export default App;
