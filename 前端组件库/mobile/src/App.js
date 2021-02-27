import './App.css';
import { viewport } from './util'
import ScrollList from './scroll'

function App() {
  viewport();
  return (
    <div className="App">
      <ScrollList />
    </div>
  );
}

export default App;
