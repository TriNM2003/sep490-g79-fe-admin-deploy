import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.tsx'
import "yet-another-react-lightbox/styles.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
