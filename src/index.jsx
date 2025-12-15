import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalLoaderBoundary from './COMPONENTS/Backend-main/GlobalLoaderBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <GlobalLoaderBoundary>
    <App />
  </GlobalLoaderBoundary>
  </BrowserRouter>
);
