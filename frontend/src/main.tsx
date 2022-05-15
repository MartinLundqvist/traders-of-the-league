import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LayoutProvider } from './contexts/LayoutProvider';
import { GameServerProvider } from './contexts/GameServerProvider';
import { Auth0Provider } from '@auth0/auth0-react';

const DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={CLIENT_ID}
      domain={DOMAIN}
      redirectUri={window.location.origin}
    >
      <GameServerProvider>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </GameServerProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
