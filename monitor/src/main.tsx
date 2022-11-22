import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import NavigationProvider from './contexts/NavigationProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
