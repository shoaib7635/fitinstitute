import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headphoneImage from '../Images/Wireless-heaadphones.jpg';

const HeadphoneDetail = ({ setProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = 59;
  const totalPrice = quantity * pricePerUnit;

  const navigate = useNavigate();

  
  const handleAddToCart = () => {
    setProduct({
      title: "Wireless Headphones",
      image: headphoneImage,
      quantity: quantity,
      total: totalPrice,
      description: "High-quality sound with long battery life. Perfect for music lovers and gamers alike."
    });

    navigate("/user");
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-8 max-w-5xl mx-auto mt-6 bg-white rounded-lg shadow">
      <div className="flex-1">
        <img
          src={headphoneImage}
          alt="Wireless Headphones"
          className="w-full max-w-md mx-auto rounded-lg shadow"
        />
      </div>

      <div className="flex-1 space-y-5">
        <h2 className="text-3xl font-bold text-gray-800">Wireless Headphones</h2>
        <p className="text-gray-600">
          Experience high-quality sound with long battery life and stylish design.
          Perfect for music lovers and gamers alike.
        </p>
        <p className="text-xl font-semibold text-green-700">Price per item: ${pricePerUnit}</p>

        <div className="flex items-center gap-4">
          <label className="font-semibold">Quantity:</label>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <p className="text-lg font-semibold text-purple-700">
          Total Price: ${totalPrice}
        </p>

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

export default HeadphoneDetail;
