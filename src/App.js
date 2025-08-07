import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import LoginForm from './LoginPage';
import HomePage from './HomePage';

import HeadphoneDetail from './ProductDetails/HeadphoneDetails';
import WatchDetails from './ProductDetails/WatchDetails';
import SpeakerDetails from './ProductDetails/BluetoothDetails';
import MouseDetails from './ProductDetails/MouseDetails';
import UserDetails from './UserDetails';
import SignUp from './SignUp';

import Home from './Home';
import About from './About';
import Product from './Product';
import Contact from './Contact';
import AddProducts from './AddProducts';

import ProductDetailPage from './ProductDetails/SelectedProduct';
import { useEffect, useState } from 'react';
import AddDummyProducts from './AddDummyProducts';
import MyOrders from './MyOrders';
import OrderdProduct from './OrderdProduct';
import AdminPanel from './AdminPanel';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [product, setProduct] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();

  // Check for saved user on app load and page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUsername(parsedUser.name);
        // You can keep this if you want to use isAdmin elsewhere
        setIsAdmin(['malikqwertyuiop2@gmail.com'].includes(parsedUser.email));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Hide navbar only on /admin route
  const hideNavbar = location.pathname === '/admin';

  return (
    <div>
      {!hideNavbar && (
        <Navbar 
          username={username} 
          setUsername={setUsername} 
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      )}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route 
          path="/login" 
          element={
            <LoginForm 
              setUsername={setUsername} 
              setIsAdmin={setIsAdmin} 
            />
          } 
        />
        <Route path="/homepage" element={<HomePage username={username} />} />

        <Route path="/speaker" element={<SpeakerDetails setProduct={setProduct} />} />
        <Route path="/mouse" element={<MouseDetails setProduct={setProduct} />} />
        <Route path="/watch" element={<WatchDetails setProduct={setProduct} />} />
        <Route path="/headphones" element={<HeadphoneDetail setProduct={setProduct} />} />
        <Route path="/signup" element={<SignUp setUsername={setUsername} />} />

        <Route path="/user" element={<UserDetails product={product} />} />
        <Route path='/about' element={<About />} />
        <Route path='/product' element={<Product />} />
        <Route path='/contact' element={<Contact />} />

        <Route
          path="/addproduct"
          element={
            isAdmin ? (
              <AddProducts />
            ) : (
              <div className="text-center mt-10 text-xl text-red-600">
                ❌ You are not authorized to access this page.
              </div>
            )
          }
        />

        <Route path="/details" element={<ProductDetailPage setProduct={setProduct} />} />
        <Route path="/DummyProduct" element={<AddDummyProducts />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/product-details" element={<OrderdProduct />} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
