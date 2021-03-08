import {
  Drag,
  // Canvas2Drag,
  // Canvas2Draw
} from './components';
import './index'

function App() {
  const dragCfg = {
    width: 100,
    height: 50,
    backgroundColor: '#cca',
    left: 160,
    top: 30
  }
  return (
    <div className="app">
      <Drag width='1000' height='500' config={dragCfg} />
    </div>
  );
}

export default App;
