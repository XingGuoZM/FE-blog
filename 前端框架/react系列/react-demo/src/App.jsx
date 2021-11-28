import { useReducer } from 'react';

const initState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'count':
      return { ...state, count: action.payload };
    default:
      return { ...state };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div className="App">
      <h1>{state.count}</h1>
      <button onClick={() => { dispatch({ type: 'count', payload: state.count + 1 }) }}>+</button>
      <button onClick={() => { dispatch({ type: 'count', payload: state.count - 1 }) }}>-</button>
    </div>
  );
}

export default App;
