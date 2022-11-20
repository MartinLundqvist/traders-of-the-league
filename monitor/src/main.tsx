import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import NavigationProvider from './contexts/NavigationProvider';
import DataProvider from './contexts/DataProvider';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </DataProvider>
  </React.StrictMode>
);
