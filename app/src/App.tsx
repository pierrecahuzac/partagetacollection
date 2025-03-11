import { Routes, Route } from 'react-router'

import './App.css'
import Homepage from './homepage'
import Dashboard from './pages/dashboard'
import Header from './componants/header/header'
import CreateCollection from './pages/createCollection/createCollection'
function App() {


  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/create-collection" element={<CreateCollection/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profil" element={<h1>Profil</h1>} />
      </Routes>
    </>
  )
}

export default App
