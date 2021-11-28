import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './Counter';
import UseCallbackTest from './useCallbackTest';

ReactDOM.render(
  <React.StrictMode>
    {/* <Counter /> */}
    <UseCallbackTest/>
  </React.StrictMode>,
  document.getElementById('root')
);
