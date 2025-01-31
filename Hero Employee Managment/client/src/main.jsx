import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { Toaster } from 'react-hot-toast'
import Routes from './routes/routes';
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from './auth/provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
        <Toaster position='top-right' reverseOrder={false} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);