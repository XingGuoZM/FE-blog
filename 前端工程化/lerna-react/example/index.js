import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from 'hello-world';

ReactDOM.render(
  <div>{Hello.getName()}</div>,
  document.querySelector('#root')
);