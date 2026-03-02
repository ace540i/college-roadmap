import React from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './auth/msalConfig';
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

msalInstance.initialize().then(() => {
  root.render(
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
}).catch((error) => {
  console.error('MSAL initialization failed:', error);
  root.render(
    <div style={{ padding: 40, fontFamily: 'sans-serif', color: 'red' }}>
      <h2>Auth initialization failed</h2>
      <pre>{String(error)}</pre>
    </div>
  );
});
