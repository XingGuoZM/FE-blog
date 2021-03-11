import './App.css';
import { viewport } from './util';
import ScrollList from './scroll';
import DragDemo from './drag';
import Tab from './tab';

function App() {
  viewport();
  return (
    <div className="App">
      {/* <ScrollList /> */}
      {/* <DragDemo/> */}
      <Tab />
    </div>
  );
}

export default App;
