import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LayoutProvider } from './contexts/LayoutProvider';
import { GameServerProvider } from './contexts/GameServerProvider';

ReactDOM.render(
  <React.StrictMode>
    <GameServerProvider>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </GameServerProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
