import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
    <div className="bg-blue-50">
      <StrictMode>
        <App />
      </StrictMode>
    </div>
)
