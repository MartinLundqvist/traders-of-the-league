import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createRoutes } from './routes';

const DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;

const queryClient = new QueryClient();

const router = createRoutes();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Auth0Provider
      clientId={CLIENT_ID}
      domain={DOMAIN}
      redirectUri={window.location.origin}
    > */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>
);
