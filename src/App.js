import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//=================== Package Imports ================

import {UserProvider} from './UserContext';
import {ProductProvider} from './ProductContext';

import './assets/css/App.css';
import './assets/css/base.css';

//sections
import AnnouncmentBar from './sections/AnnouncementBar';
import MainNavBar from './sections/MainNavBar';

//pages
import Admin from './pages/Admin'
import Home from './pages/Home';
import Login from './pages/Login'
import Logout from './pages/Logout'
import Products from './pages/Products'
import Register from './pages/Register'
import Error from './pages/Error'
//================== local imports ===================

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const [product, setProduct] = useState({
    id: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
      console.log(user);
      console.log(localStorage);
    }, [user])

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
    <ProductProvider value={{product, setProduct}}>
      <Router>
        <AnnouncmentBar />
        <MainNavBar />
          <Routes>
            <Route path="*" element={<Error/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/collection" element={<Products/>}/>
            <Route path="/signup" element={<Register/>}/>
          </Routes>
      </Router>
    </ProductProvider>
    </UserProvider>
  )
}

export default App;
