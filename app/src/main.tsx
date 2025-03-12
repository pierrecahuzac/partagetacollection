import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router";
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
  // </StrictMode>,
)
