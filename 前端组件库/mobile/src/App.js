import './App.css';
import { viewport } from './util';
import useCountdown from './hooks/useCountdown';
// import ScrollList from './scroll';
// import DragDemo from './components/drag';
// import ScrollAnimation from './pages/scrollAnimation';
// import HorseLamp from './pages/HorseLamp';
// import Carousel from './pages/Carousel';
import InfinateScroll from './pages/InfinateScroll';
import DebounceThrottle from './pages/debounce&throttle';
import Marquee from './pages/Marquee';
// import Spread from './pages/Speard';
import VirtualList from './pages/VirtualList';
import MockPage from './pages/MockPage';
import { ModalManager, Tab, ScrollList, DragDemo, CountDown } from './components';
import Modal1 from './pages/modal1';
import TestEffect from './pages/TestEffect';
import { tabProps } from './config';
const list = [
  { name: 'hello' },
  { name: 'bin' },
  { name: 'fash' }
]
viewport();
function App() {
  const mm = new ModalManager();
  mm.regist({ modal1: Modal1 })
  // Modal.regist({key:'modal1'})
  function openModal() {
    mm.showModal();
  }
  // const { day, hour, minute, second, millisecond } = useCountdown(10000, () => { console.log('complete!') });
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      {/* <Tab {...tabProps} /> */}
      {/* <Modal/> */}
      {/* <button onClick={()=>openModal()}>open</button> */}
      {/* <Marquee data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} /> */}
      {/* <CountDown timeRemaining={10000} onComplete={() => { console.log('complete') }} /> */}
      {/* <ScrollAnimation /> */}
      {/* <HorseLamp /> */}
      {/* <MockPage /> */}
      {/* <Carousel /> */}
      {/* <InfinateScroll /> */}
      {/* <Spread /> */}
      {/* <VirtualList /> */}
      {/* <TestEffect visible={false} /> */}
      <DebounceThrottle/>
    </div>
  );
}

export default App;
