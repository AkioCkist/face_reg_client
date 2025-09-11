import React from 'react';

const IncomeVariationsChart = () => {
  // In a real application, you would use a chart library like Chart.js, Recharts, or ApexCharts
  // This is a simplified representation
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Income Variations</h3>
      <div className="w-full aspect-square flex items-center justify-center relative">
        {/* Placeholder for donut chart */}
        <div className="w-48 h-48 rounded-full border-8 border-gray-100 relative">
          <div 
            className="absolute top-0 left-0 w-full h-full border-t-8 border-l-8 border-pink-400 rounded-full"
            style={{ clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)' }}
          ></div>
          <div 
            className="absolute top-0 right-0 w-full h-full border-t-8 border-r-8 border-yellow-400 rounded-full"
            style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-full h-full border-b-8 border-r-8 border-blue-500 rounded-full"
            style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-full h-full border-b-8 border-l-8 border-green-400 rounded-full"
            style={{ clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-gray-500">Variations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeVariationsChart;
