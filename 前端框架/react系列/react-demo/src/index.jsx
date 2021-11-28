import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './Counter';
import UseCallbackTest from './useCallbackTest';
import UseMemoTest from './useMemoTest';

ReactDOM.render(
  <React.StrictMode>
    {/* <Counter /> */}
    {/* <UseCallbackTest/> */}
    <UseMemoTest/>
  </React.StrictMode>,
  document.getElementById('root')
);
