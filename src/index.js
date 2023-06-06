import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './style/style.css';
import './style/login.css';
import './style/signup.css';
import './style/mediaqueries.css';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
