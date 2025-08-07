import React from 'react';

const HomePage = (props) => {
  return (
    <div className="bg-white">
      <h1 className="flex text-3xl font-bold text-gray-800">
        Welcome, {props.username}!
      </h1>
      
    </div>
  );
};

export default HomePage;
