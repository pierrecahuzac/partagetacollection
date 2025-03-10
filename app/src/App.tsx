import { Routes, Route } from 'react-router'

import './App.css'
import Homepage from './homepage'
import Dashboard from './pages/dashboard'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello React!</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profil" element={<h1>Profil</h1>} />
      </Routes>
    </>
  )
}

export default App
