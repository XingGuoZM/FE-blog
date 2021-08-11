import './App.css';
import { viewport } from './util';
import useCountdown from './hooks/useCountdown';
// import ScrollList from './scroll';
// import DragDemo from './components/drag';
import { ModalManager, Tab, ScrollList, DragDemo, Marquee, CountDown } from './components';
import Modal1 from './pages/modal1';
import { tabProps } from './config';
const list = [
  { name: 'hello' },
  { name: 'bin' },
  { name: 'fash' }
]

function App() {
  viewport();
  const mm = new ModalManager();
  mm.regist({ modal1: Modal1 })
  // Modal.regist({key:'modal1'})
  function openModal() {
    mm.showModal();
  }
  const { day, hour, minute, second } = useCountdown(10000, () => { console.log('complete!') });
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      {/* <Tab {...tabProps} /> */}
      {/* <Modal/> */}
      {/* <button onClick={()=>openModal()}>open</button> */}
      {/* <Marquee data={list} /> */}
      {/* <CountDown timeRemaining={10000} onComplete={() => { console.log('complete') }} /> */}
    </div>
  );
}

export default App;
