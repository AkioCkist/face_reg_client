import React from 'react';

const SalesCard = ({ amount, salesCount, title = 'Sales' }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">${amount}</h2>
          <p className="text-sm text-gray-500">({salesCount} sales)</p>
        </div>
        <div className="w-16 h-16 relative">
          {/* Placeholder for circular progress chart */}
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white"></div>
            {/* This would be replaced with an actual progress indicator */}
            <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 32 32">
              <circle 
                cx="16" cy="16" r="14" 
                fill="none" 
                stroke="#f0f0f0" 
                strokeWidth="4" 
              />
              <circle 
                cx="16" cy="16" r="14" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="4" 
                strokeDasharray="88" 
                strokeDashoffset="22" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
