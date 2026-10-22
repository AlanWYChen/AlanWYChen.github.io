import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Fragment loads are positioned by App after hydration changes card heights.
// Prevent the browser from subsequently restoring the pre-hydration offset.
if (window.location.hash) {
  window.history.scrollRestoration = 'manual';
}

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
