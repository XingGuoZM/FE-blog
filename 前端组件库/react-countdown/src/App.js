
import CountDown from './CountDown';
function App() {
  return (
    <div>
      <CountDown remainTs={10000} onComplete={() => { console.log('complete') }} />
    </div>
  );
}

export default App;
