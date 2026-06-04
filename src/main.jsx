import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Lucide icon initialization — runs after every DOM mutation
// This ensures icons rendered via data-lucide attributes are always processed
const initLucide = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

// Initial call
initLucide();

// Observe DOM changes to re-render icons when React updates the DOM
const observer = new MutationObserver(() => {
  initLucide();
});
observer.observe(document.body, { childList: true, subtree: true });
