import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import emailjs from 'emailjs-com';

const UserDetails = ({ product: propProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state || propProduct;

  const [user, setUser] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Function to remove product from PendingProducts after successful order
  const removePendingProduct = async (productData) => {
    try {
      const pendingQuery = query(
        collection(db, 'PendingProducts'),
        where('title', '==', productData.title),
        where('price', '==', productData.price),
        where('quantity', '==', productData.quantity)
      );
      
      const pendingSnapshot = await getDocs(pendingQuery);
      
      if (!pendingSnapshot.empty) {
        // Delete the first matching document
        await deleteDoc(pendingSnapshot.docs[0].ref);
        console.log('Pending product removed successfully');
      }
    } catch (error) {
      console.error('Error removing pending product:', error);
      // Don't throw error here as order is already placed
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error('Please login first to checkout.', {position:"bottom-right"});
      return;
    }

    if (!user.name || !user.address || !user.phone) {
      toast.error('Please fill all user details.', {position:"bottom-right"});
      return;
    }

    setIsProcessing(true);

    const quantity = product?.quantity || 1;
    const pricePerItem = product?.price || 0;
    const totalPrice = product?.total || quantity * pricePerItem;
    const orderId = Math.floor(Math.random() * 1000000);

    const orderData = {
      orderId: orderId,
      name: user.name,
      address: user.address,
      phone: user.phone,
      productTitle: product?.title,
      productId: product?.id || '',
      quantity,
      pricePerItem,
      totalPrice,
      imageUrl: product?.imageUrl,
      orderedAt: serverTimestamp(),
      status: 'completed' // Changed from 'pending' to 'completed'
    };

    try {
      // 1️⃣ Save order to Firebase (Orders collection)
      await addDoc(collection(db, 'Orders'), orderData);
      
      // 2️⃣ Save order to Firebase (OrderedProducts collection for user tracking)
      await addDoc(collection(db, 'OrderedProducts'), orderData);
      
      // 3️⃣ Remove product from PendingProducts collection
      await removePendingProduct({
        title: product?.title,
        price: product?.price,
        quantity: product?.quantity
      });
      
      // 4️⃣ Send Email to Admin via EmailJS
      const templateParams = {
        order_id: orderId,
        email: 'malikqwertyuiop2@gmail.com', // Admin email
        order_title: product?.title,
        quantity: quantity,
        price: pricePerItem,
        total: totalPrice,
        image_url: product?.imageUrl,
        user_name: user.name,
        user_address: user.address,
        user_phone: user.phone,
      };

      await emailjs.send(
        'service_j6anm83',      // Your EmailJS service ID
        'template_8h5hzbi',     // Your EmailJS template ID
        templateParams,         // Data to send
        'TAEw-GfJioSge_4o3'     // Your EmailJS public key
      );

      // 5️⃣ Show success toast
      toast.success(`🎉 Thanks ${user.name}! Your order #${orderId} has been placed successfully!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // 6️⃣ Navigate to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2500);

    } catch (error) {
      console.error('Error processing order: ', error);
      toast.error('Something went wrong. Please try again.', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6 max-w-6xl mx-auto bg-white mt-6 rounded-xl shadow-md">
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Left - User Form */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Details</h2>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter your full name"
            disabled={isProcessing}
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Address</label>
          <textarea
            name="address"
            value={user.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Enter your full address"
            rows="3"
            disabled={isProcessing}
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="03XX-XXXXXXX"
            disabled={isProcessing}
          />
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
            isProcessing 
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Order...
            </>
          ) : (
            '🛒 Place Order'
          )}
        </button>
      </div>

      {/* Right - Product Display */}
      {product ? (
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Selected Product</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
              }}
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Price per item:</span>
                <span className="text-sm font-bold text-green-600">Rs. {product.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <span className="text-sm font-bold text-blue-600">{product.quantity || 1}x</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total Price:</span>
                  <span className="text-lg font-bold text-green-600">
                    Rs. {(product.total || (product.quantity || 1) * product.price)?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 flex items-center justify-center text-gray-500 italic bg-gray-100 rounded-xl">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"></path>
            </svg>
            <p className="text-lg">No product selected</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;