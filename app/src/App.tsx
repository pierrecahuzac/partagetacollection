import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Homepage from './pages/homepage'

import CreateCollection from './pages/createCollection'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Profile from './pages/profile'
import Collection from './pages/collection'
import CreateItem from './pages/createItem';
import UserCollections from './pages/userCollections';
import ErrorPage from './pages/errorPage';
import Contact from './pages/contact';

import ItemPage from './pages/itemPage';
import Layout from './components/ui/layout';
import UserItem from './pages/userItems';
import PrivateRoute from './components/routing/Privateroute';;

import './styles/index.scss';
import './styles/normalize.css';
import Dashboard from './pages/dashboard';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import UserFavorites from './pages/userFavorites';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create-collection" element={<CreateCollection />} />
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collection/:collectionId" element={<Collection />} />
            <Route path="/my-collections/" element={<UserCollections />} />
            <Route path="/my-favorites/" element={<UserFavorites />} />
            <Route path="/my-item/:collectionItemId" element={<UserItem
            />} />
            <Route path='/item/:itemId' element={<ItemPage />}></Route>
          </Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Route>      </Routes>

    </>
  )
}

export default App