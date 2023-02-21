import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createRoutes } from './routes';

const DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;

const queryClient = new QueryClient();

const router = createRoutes();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
