import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductList from './ProductList';
import Cards from './Cards';
import HomePage from './HomePage';

// Import your existing images
import Bluetooth from './Images/Bluetooth-speaker.jpg';
import Mouse from './Images/Gaming-mouse.jpg';
import Watch from './Images/Smart-watch.jpg';
import Headphone from './Images/Wireless-heaadphones.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = ({setProduct}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('null');

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUsername(parsedUser.name);
    }
  }, []);

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
  // Hero Section
const heroImages = [
  { url: Bluetooth, alt: 'Bluetooth Speaker' },
  { url: Mouse, alt: 'Gaming Mouse' },
  { url: Watch, alt: 'Smart Watch' },
  { url: Headphone, alt: 'Wireless Headphones' },
];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Tech Image */}
   <div className="relative h-[500px] w-full overflow-hidden">
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 3500, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    loop={true}
    className="w-full h-full"
  >
    {heroImages.map((img, index) => (
      <SwiperSlide key={index} className="relative">
        <img
          src={img.url}
          alt={img.alt}
          className="w-full h-[500px] object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-blue-900/50 to-green-900/60 z-10" />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Hero Text & Button */}
  <motion.div 
    className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20"
    initial="hidden"
    animate="show"
    variants={fadeInUp}
  >
    <motion.h1 
      className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
      variants={fadeInUp}
    >
      NextStore
    </motion.h1>
    <motion.p 
      className="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed"
      variants={fadeInUp}
    >
      Discover the Future of Technology - Premium Gadgets, Unbeatable Prices
    </motion.p>
    <motion.div variants={fadeInUp}>
      <button
        onClick={() => navigate('/product')}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-3 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
      >
        Explore Products
      </button>
    </motion.div>
  </motion.div>
</div>



      {/* Welcome Section */}
      <div className="flex flex-col pt-8">
        <div><HomePage username={username}/></div>

        {/* Featured Categories */}
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-800 mb-12 mt-16"
            variants={fadeInUp}
          >
            Featured <span className="text-green-600">Categories</span>
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
          >
            <motion.div variants={cardVariant}>
              <Cards
                image={Bluetooth}
                text="Portable and powerful sound anywhere."
                title="Bluetooth Speaker"
                btnText="Shop Now"
                link="/speaker"
              />
            </motion.div>

            <motion.div variants={cardVariant}>
              <Cards
                image={Mouse}
                text="Precision and performance for every click."
                title="Gaming Mouse"
                btnText="Shop Now"
                link="/mouse"
              />
            </motion.div>

            <motion.div variants={cardVariant}>
              <Cards
                image={Watch}
                text="Track your health and fitness in style."
                title="Smart Watch"
                btnText="Shop Now"
                link="/watch"
              />
            </motion.div>

            <motion.div variants={cardVariant}>
              <Cards
                image={Headphone}
                text="High-quality sound with long battery life."
                title="Wireless Headphones"
                btnText="Shop Now"
                link="/headphones"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Latest Products */}
        <div className="max-w-7xl mx-auto px-4 mt-20">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
          >
            Latest <span className="text-green-600">Products</span>
          </motion.h2>
          <ProductList setProduct={setProduct}/>
        </div>
      </div>

      {/* Why Choose NextStore - Enhanced */}
      <motion.div 
        className="bg-gradient-to-r from-gray-50 to-gray-100 py-20 px-6 mt-20"
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose <span className="text-green-600">NextStore?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            variants={cardVariant}
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Lightning Fast Delivery</h3>
            <p className="text-gray-600 leading-relaxed">Get your products delivered in 1-2 days across Pakistan with our premium logistics network.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            variants={cardVariant}
          >
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">100% Secure Payment</h3>
            <p className="text-gray-600 leading-relaxed">Bank-level encryption and multiple payment options ensure your transactions are always safe.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            variants={cardVariant}
          >
            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">24/7 Expert Support</h3>
            <p className="text-gray-600 leading-relaxed">Our tech experts are available round-the-clock to help you choose the perfect products.</p>
          </motion.div>

        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div 
        className="bg-gradient-to-r from-green-600 to-blue-600 py-16 px-6"
        initial="hidden"
        whileInView="show"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Tech</h2>
          <p className="text-xl mb-8 opacity-90">Get exclusive deals and early access to new products</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            />
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;