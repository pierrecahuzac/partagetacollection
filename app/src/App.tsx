import { Routes, Route } from 'react-router'

import Homepage from './homepage'
import Header from './componants/header/header'
import CreateCollection from './pages/createCollection'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Profile from './pages/profile'
import Collection from './pages/collection'
import Landing from './pages/landing'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/homepage" element={<Homepage />} />

        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/create-collection" element={<CreateCollection />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/collection/:collectionId" element={<Collection/>} />
      </Routes>
    </>
  )
}

export default App
