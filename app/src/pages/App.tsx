import { Routes, Route } from 'react-router'
import { ToastContainer} from 'react-toastify';
import Homepage from './homepage'
import Header from '../componants/header'
import CreateCollection from './createCollection'
import Signin from './signin'
import Signup from './signup'
import Profile from './profile'
import Collection from './collection'
import Landing from './landing'
import CreateItem from './createItem';
const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/create-collection" element={<CreateCollection />} />
        <Route path="/create-item" element={<CreateItem />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/collection/:collectionId" element={<Collection/>} />
      </Routes>
    </>
  )
}

export default App