import './App.css';
import { viewport } from './util';
import ScrollList from './scroll';
import DragDemo from './drag';

function App() {
  viewport();
  return (
    <div className="App">
      {/* <ScrollList /> */}
      <DragDemo/>
    </div>
  );
}

export default App;
