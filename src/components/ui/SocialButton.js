import React from 'react';

const SocialButton = ({ provider, icon, className = '', ...props }) => {
  return (
    <button 
      className={`flex justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default SocialButton;
