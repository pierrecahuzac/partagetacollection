
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/authContext.tsx';

import App from './App.tsx'

import './styles/normalize.css'
import { GlobalProvider } from './context/globalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <AuthProvider>
      <Router future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true
      }}>
        <App />
      </Router>
    </AuthProvider>
  </GlobalProvider>

)
