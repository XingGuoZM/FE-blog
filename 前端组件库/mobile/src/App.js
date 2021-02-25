import './App.css';
import { viewport } from './util'
import ScrollList from './scroll'

function App() {
  viewport();
  return (
    <div className="App">
      <div style={{ fontSize: '.2rem', width: '7.5rem', height: '5rem', background: '#f2f' }}>hello</div>
      <ScrollList />
    </div>
  );
}

export default App;
