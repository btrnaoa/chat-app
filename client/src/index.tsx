import React from 'react';
import { render } from 'react-dom';
import { GlobalStyles } from 'twin.macro';
import App from './App';

render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
