
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/authContext.tsx';

import App from './App.tsx'

import './styles/normalize.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <Router future={{
        v7_relativeSplatPath: true,
        v7_startTransition :true
      }}>
        <App />
      </Router>
    </AuthProvider>
  // </StrictMode>,
)
