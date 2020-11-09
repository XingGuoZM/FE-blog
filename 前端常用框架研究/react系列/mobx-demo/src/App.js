

import { observer } from "mobx-react";

// create observer
const App = observer(({ appState }) => (
  <div className="App">
    <h1>{appState.timer}</h1>
    <button onClick={appState.add}>add</button>
    <button onClick={appState.minus}>minus</button>
  </div>
));

export default App;