import './App.css';
import { viewport } from './util';
// import ScrollList from './scroll';
// import DragDemo from './components/drag';
import {ModalManager, Tab, ScrollList, DragDemo } from './components';
import Modal1 from './pages/modal1';
import { tabProps } from './config';
function App() {
  viewport();
  const mm = new ModalManager();
  mm.regist({modal1:Modal1})
  // Modal.regist({key:'modal1'})
  function openModal(){
    mm.showModal();
  }
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      {/* <Tab {...tabProps} /> */}
      {/* <Modal/> */}
      <button onClick={()=>openModal()}>open</button>
    </div>
  );
}

export default App;
