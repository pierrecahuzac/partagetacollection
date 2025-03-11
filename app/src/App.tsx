import { Routes, Route } from 'react-router'

//import './App.css'
import Homepage from './homepage'
import Header from './componants/header/header'
import CreateCollection from './pages/createCollection/createCollection'
import Signin from './pages/signin/signin'
import Signup from './pages/signup/signup'
import Profile from './pages/profile'
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/create-collection" element={<CreateCollection />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App
