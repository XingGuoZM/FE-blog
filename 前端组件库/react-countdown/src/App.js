
import CountDown from './CountDown/hooks&SetInterval';
function App() {
  return (
    <div>
      <CountDown remainTs={10000} onComplete={() => { console.log('complete') }} />
    </div>
  );
}

export default App;
