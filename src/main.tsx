import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ItemsProvider } from './context/ItemsContext';
import { ToastProvider } from './context/ToastContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ItemsProvider>
          <App />
        </ItemsProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
