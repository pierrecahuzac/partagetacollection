import { Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify';
import Homepage from './homepage'

import CreateCollection from './createCollection'
import Signin from './signin'
import Signup from './signup'
import Profile from './profile'
import Collection from './collection'
import Landing from './landing'
import CreateItem from './createItem';
import UserCollection from './userCollection';
import ErrorPage from './ErrorPage';

import '../styles/index.scss';
import '../styles/normalize.css';

import ItemPage from './itemPage';
import Layout from '../components/layout';
import UserItem from './userItems';

const App = () => {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/create-collection" element={<CreateCollection />} />
          <Route path="/create-item" element={<CreateItem />} />          
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/my-collections/" element={<UserCollection />} />
          <Route path="/my-items/" element={<UserItem
           />} />
          <Route path='/item/:itemId' element={<ItemPage />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App