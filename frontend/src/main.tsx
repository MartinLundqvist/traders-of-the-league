import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LayoutProvider } from './contexts/LayoutProvider';
import { GameServerProvider } from './contexts/GameServerProvider';
import { Auth0Provider } from '@auth0/auth0-react';
import { NotificationsProvider } from './contexts/NotificationsProvider';

const DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={CLIENT_ID}
      domain={DOMAIN}
      redirectUri={window.location.origin}
    >
      <NotificationsProvider>
        <GameServerProvider>
          <LayoutProvider>
            <App />
          </LayoutProvider>
        </GameServerProvider>
      </NotificationsProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
