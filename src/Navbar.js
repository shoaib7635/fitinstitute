import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Images/Next Store.png';

const Navbar = ({ username, setUsername, isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername(null);
    setIsAdmin(false); // Reset admin state on logout
    navigate("/login");
  };

  return (
    <nav className="bg-green-900 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full shadow-md" />
          <span className="text-2xl font-bold tracking-wide">Next Store</span>
        </div>

        <ul className="hidden md:flex space-x-7 text-lg font-medium pt-3">
          <li><Link to="/home" className="text-white hover:text-gray-300 no-underline">Home</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-300 no-underline">About</Link></li>
          <li><Link to="/product" className="text-white hover:text-gray-300 no-underline">Product</Link></li>
          <li><Link to="/contact" className="text-white hover:text-gray-300 no-underline">Contact</Link></li>
          
          {/* Only show Add Product for admin users */}
          {isAdmin && (
            <li>
              <Link to="/addproduct" className="text-white hover:text-gray-300 no-underline">
                Add Product
              </Link>
            </li>
          )}
          
          {/* Only show My Orders for logged in users */}
          {isAdmin && (
            <li><Link to="/my-orders" className="text-white hover:text-gray-300 no-underline">My Orders</Link></li>
          )}
        </ul>

        <div className="mt-4 md:mt-0">
          {username ? (
              <button
                onClick={handleLogout}
                className="bg-white text-green-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
              >
                Logout
              </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;