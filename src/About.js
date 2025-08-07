import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">About NextBuy</h2>
        <p className="text-gray-700 text-lg">
          NextBuy is your one-stop online store for high-quality tech products. We aim to provide 
          top-tier gadgets including wireless headphones, smart watches, gaming mice, and more — 
          all at affordable prices.
        </p>
        <p className="text-gray-600 mt-4">
          Our mission is to bring the best technology right to your doorstep with exceptional 
          customer service, fast delivery, and secure shopping experience.
        </p>
      </div>
    </div>
  );
};

export default About;
