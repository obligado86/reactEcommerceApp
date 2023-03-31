import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//=================== Package Imports ================

import {UserProvider} from './UserContext';
import {ProductProvider} from './ProductContext';
import {OrderProvider} from './OrderContext';

import './assets/css/App.css';
import './assets/css/base.css';

//components
import MainNavBar from './components/MainNavBar';
import AdminProductList from './components/AdminProductList'
import Footer from './components/Footer'

//pages
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login'
import Logout from './pages/Logout'
import Products from './pages/Products'
import ProductView from './pages/ProductView'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
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

  const [order, setOrder] = useState({
    id: null
  })

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    //const checkUser = JSON.parse(localStorage.getItem("token"));
      //console.log(user);
      //console.log(localStorage);
    }, [user])

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
    <ProductProvider value={{product, setProduct}}>
    <OrderProvider value={{order, setOrder}}>
      <Router>
        <MainNavBar />
          <Routes>
            <Route path="*" element={<Error/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<AdminProductList/>}/>
            <Route path="/:userId/checkout" element={<Checkout/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/collection/:categoryName" element={<Products/>}/>
            <Route path="/collection/:productId" element={<ProductView/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/:userId/profile" element={<UserProfile/>}/>
          </Routes>
        <Footer/>
      </Router>
    </OrderProvider>
    </ProductProvider>
    </UserProvider>
  )
}

export default App;
