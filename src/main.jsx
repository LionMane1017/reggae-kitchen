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
  if (window.lucide && document.querySelector('i[data-lucide]')) {
    window.lucide.createIcons();
  }
};

// Initial call
initLucide();

// Observe DOM changes to re-render icons when React updates the DOM.
// We explicitly filter mutations to only trigger when new i[data-lucide] nodes are added,
// preventing infinite loops since createIcons replacing them with SVGs counts as a mutation.
const observer = new MutationObserver((mutations) => {
  const hasNewIcons = mutations.some(mutation => 
    Array.from(mutation.addedNodes).some(node => 
      node.nodeType === Node.ELEMENT_NODE && 
      (node.matches('i[data-lucide]') || node.querySelector('i[data-lucide]'))
    )
  );
  if (hasNewIcons) {
    initLucide();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
