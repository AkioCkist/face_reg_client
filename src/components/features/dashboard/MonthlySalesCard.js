import React from 'react';

const MonthlySalesCard = ({ amount, salesCount }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Monthly Sales</h3>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">${amount}</h2>
          <p className="text-sm text-gray-500">({salesCount} sales)</p>
        </div>
        <div className="w-16 h-8 relative">
          {/* Placeholder for gauge chart */}
          <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400" 
              style={{ width: '70%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesCard;
