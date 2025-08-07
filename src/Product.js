import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

// Import your existing images
import Mouse from './Images/Gaming-mouse.jpg';
import Speaker from './Images/Bluetooth-speaker.jpg';
import Watch from './Images/Smart-watch.jpg';
import Headphones from './Images/Wireless-heaadphones.jpg';

const Product = () => {
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const categories = [
    {
      image: Mouse,
      title: "Gaming Mouse",
      description: "Precision and performance for every click.",
      category: "Mouse",
      color: "from-red-500 to-pink-500"
    },
    {
      image: Speaker,
      title: "Bluetooth Speaker",
      description: "Portable and powerful sound anywhere.",
      category: "AC",
      color: "from-blue-500 to-purple-500"
    },
    {
      image: Watch,
      title: "Smart Watch",
      description: "Track your health and fitness in style.",
      category: "Bike",
      color: "from-green-500 to-teal-500"
    },
    {
      image: Headphones,
      title: "Wireless Headphones",
      description: "High-quality sound with long battery life.",
      category: "Electronics",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 py-20 px-6"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Our Products
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl opacity-90 leading-relaxed"
            variants={fadeInUp}
          >
            Explore our premium collection of tech gadgets and accessories
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
              onClick={() => navigate("/DummyProduct", { state: { category: category.category } })}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Floating elements for tech feel */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-8 right-8 w-2 h-2 bg-white rounded-full opacity-40 animate-pulse delay-300"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-green-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 hover:cursor-pointer">
                  <span>Explore Collection</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* All Products Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Featured <span className="text-green-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium tech products
          </p>
        </motion.div>

        <ProductList />

        {/* Stats Section */}
        <motion.div 
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12 mt-20"
          initial="hidden"
          whileInView="show"
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600 text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 text-lg">Premium Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 text-lg">Expert Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;