import '@genshi/tokens/css';
import '@genshi/themes/seamkit-default';
import '@genshi/react/register';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
