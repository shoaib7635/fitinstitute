import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ setUsername, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const querySnapshot = await getDocs(collection(db, "Signup"));
      let foundUser = null;

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.email === email && user.password === password) {
          foundUser = user;
        }
      });

      if (foundUser) {
  // Save user to localStorage
  localStorage.setItem("user", JSON.stringify(foundUser));
  
  // Check if admin
  const ADMIN_EMAILS = ['malikqwertyuiop2@gmail.com'];
  const isAdminUser = ADMIN_EMAILS.includes(foundUser.email);

  // ✅ Save admin info separately
  if (isAdminUser) {
    localStorage.setItem("admin", JSON.stringify(foundUser));
  }

  // Set username and admin state
  setUsername(foundUser.name);
  setIsAdmin(isAdminUser);
  
  toast.success("Login successful!");
  setTimeout(() => {
    navigate(isAdminUser ? '/admin' : '/');
  }, 1500);
}
 else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></p>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default LoginForm;