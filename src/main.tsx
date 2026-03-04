import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss';
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { retryHandler } from './api/utils/retryHandler.ts';
import { STALE_TIME } from './api/constants.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: retryHandler,
      staleTime: STALE_TIME,
    },
    mutations: {
      retry: retryHandler,
    },
  },
})

async function prepare() {
  if (import.meta.env.DEV) {
    console.log({meta: import.meta.env.DEV});
    // const { worker } = await import('./mocks/browser')
    // return worker.start()
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
});
