import React from 'react';

const Divider = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      {children && (
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">{children}</span>
        </div>
      )}
    </div>
  );
};

export default Divider;
