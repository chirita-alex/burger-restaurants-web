import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss';
import App from './App.tsx'
import { worker } from './mocks/browser.ts';

async function prepare() {
  if (import.meta.env.DEV) {
    try {
      await worker.start();
    } catch (error) {
      console.error('MSW failed to start:', error);
    }
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
});
