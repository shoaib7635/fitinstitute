import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDoc, collection, db, serverTimestamp } from '../firebase';
import { toast } from 'react-toastify';


const ProductDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!state) return <div>No product found</div>;

  const { title, description, imageUrl, price } = state;
  const total = price * quantity;



const handleAddToCart = async () => {
  const selectedProduct = {
    title,
    description,
    imageUrl,
    price,
    quantity,
    total,
    createdAt: serverTimestamp(), // optional
    status: "pending"
  };

  try {
    await addDoc(collection(db, "PendingProducts"), selectedProduct);
    toast.success("Product added to cart");

    navigate("/user", { state: selectedProduct });
  } catch (err) {
    console.error("Error adding to cart", err);
    toast.error("Failed to add to cart");
  }
};



  return (
    <div className="flex flex-col md:flex-row p-6 gap-8 max-w-5xl mx-auto mt-6 bg-white rounded-lg shadow">
      {/* Image Left */}
      <div className="flex-1">
        <img src={imageUrl} alt={title} className="w-full h-96 object-cover rounded-lg shadow" />
      </div>

      {/* Info Right */}
      <div className="flex-1 space-y-5">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-xl font-semibold text-green-700">Price: ${price}</p>

        <div className="flex items-center gap-4">
          <label className="font-semibold">Quantity:</label>
          <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}>-</button>
          <span className="font-bold text-lg">{quantity}</span>
          <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <p className="text-lg font-semibold text-purple-700">Total: ${total}</p>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
