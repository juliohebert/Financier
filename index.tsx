
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Erro ao inicializar a aplica\u00e7\u00e3o:', error);
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
      <div style="max-width: 500px; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h1 style="color: #ef4444; margin-bottom: 1rem;">Erro ao carregar a aplica\u00e7\u00e3o</h1>
        <p style="margin-bottom: 1rem;">Ocorreu um erro ao inicializar. Por favor, verifique o console do navegador.</p>
        <button onclick="window.location.reload()" style="background: #10b981; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
          Recarregar
        </button>
      </div>
    </div>
  `;
}
