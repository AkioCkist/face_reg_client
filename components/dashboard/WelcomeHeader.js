import React from 'react';

const WelcomeHeader = ({ name, location }) => {
  return (
    <div className="bg-pink-50 rounded-lg p-6 flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Welcome</h1>
        <h2 className="text-3xl font-bold text-blue-900 mb-4">{name}</h2>
        <div className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
          {location}
        </div>
      </div>
      <div className="relative">
        <div className="w-40 h-40">
          {/* Illustration of person with books */}
          <div className="absolute right-0 w-full h-full">
            {/* This is a placeholder for the illustration */}
            <div className="w-full h-full relative">
              {/* You can replace this with an actual SVG or Image component */}
              <div className="bg-pink-300 rounded-full w-16 h-16 absolute top-10 right-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
