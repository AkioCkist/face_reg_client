import React from 'react';

const Input = ({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  className = '', 
  error,
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border rounded-md 
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
          text-gray-700 
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
