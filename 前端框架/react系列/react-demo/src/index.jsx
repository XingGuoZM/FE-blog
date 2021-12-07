import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './Counter';
import UseCallbackTest from './useCallbackTest';
import UseMemoTest from './useMemoTest';
import HelloWorld from './HelloWorld';

ReactDOM.render(
  <React.StrictMode>
    {/* <Counter /> */}
    {/* <UseCallbackTest/> */}
    {/* <UseMemoTest/> */}
    <HelloWorld />
  </React.StrictMode>,
  document.getElementById('root')
);
