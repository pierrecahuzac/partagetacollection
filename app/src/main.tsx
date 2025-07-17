
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/authContext.tsx';

import App from './App.tsx'

import './styles/normalize.css'
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>,
)
