import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    const ADMIN_EMAILS = ['malikqwertyuiop2@gmail.com'];
    if (ADMIN_EMAILS.includes(parsedUser.email)) {
      setIsAdmin(true);
    }
  }
}, []);


if (!isAdmin) {
  return (
    <div className="text-center text-red-600 text-xl mt-20">
      ❌ You are not authorized to access this page.
    </div>
  );
}


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!image) return toast.error("Please select an image");

  setLoading(true);

  try {
    // 1. Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'AddProducts');
    formData.append('cloud_name', 'dyenuc67w');

    const res = await fetch('https://api.cloudinary.com/v1_1/dyenuc67w/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const uploadedImageUrl = data.secure_url;

    // 2. Send product data to backend
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        category,
        imageUrl: uploadedImageUrl,
      }),
    });

    if (response.ok) {
      toast.success("✅ Product added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
    } else {
      toast.error("❌ Error adding product");
    }

  } catch (error) {
    console.error(error);
    toast.error("❌ Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Add New Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter product title"
              className="mt-1 w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="mt-1 w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Enter product price"
              className="mt-1 w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="mt-1 w-full border rounded px-4 py-2"
              required
            >
              <option value="">Select category</option>
              <option value="Headphones">Headphones</option>
              <option value="Mouse">Mouse</option>
              <option value="Watch">Watch</option>
              <option value="Speaker">Speaker</option>
              <option value="AC">AC</option>
              <option value="Bike">Bike</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              className="mt-1 w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
