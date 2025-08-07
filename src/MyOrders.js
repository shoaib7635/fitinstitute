import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

const MyProducts = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.email === "malikqwertyuiop2@gmail.com";

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "Orders"));
    const ordersData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setOrders(ordersData);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    await deleteDoc(doc(db, "Orders", id));
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'shipped':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        Access Denied — Admin Only
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My <span className="text-green-600">Orders</span>
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No products found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center gap-4 p-4 relative"
            >
              <img
                src={order.imageUrl || 'https://via.placeholder.com/150'}
                alt={order.productTitle || 'Product Image'}
                className="w-28 h-28 object-cover rounded-xl border"
              />

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {order.productTitle}
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                    {order.status || "Pending"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-3">
                  Order ID: <span className="font-medium">{order.id}</span>
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => navigate('/product-details', { state: { order } })}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-all duration-300"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => alert('Edit functionality coming soon!')}
                    className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-sm flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
