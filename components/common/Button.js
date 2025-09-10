import React from 'react';

const Button = ({ 
  children, 
  type = 'button',
  variant = 'primary',
  size = 'medium',
  className = '',
  fullWidth = false,
  ...props 
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'
  };
  
  // Size classes
  const sizeClasses = {
    small: 'py-1.5 px-3 text-sm',
    medium: 'py-2.5 px-4',
    large: 'py-3 px-5 text-lg'
  };
  
  return (
    <button
      type={type}
      className={`
        rounded-lg font-medium transition-colors duration-200
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
