import React from 'react';
import ReactDOM from 'react-dom';
import appState from './store'
import App from './App';


ReactDOM.render(
  <App appState={appState} />,
  document.getElementById('root')
);
