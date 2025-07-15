/* eslint-disable @next/next/no-img-element */
import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-8 ">
        <h1 className="text-3xl font-semibold text-gray-800">Page Under Construction</h1>
        <p className="text-lg text-gray-600 mt-4 mb-6">
          We are working hard to bring you this page. Please check back later!
        </p>
       
      </div>
    </div>
  );
};

export default UnderConstruction;
