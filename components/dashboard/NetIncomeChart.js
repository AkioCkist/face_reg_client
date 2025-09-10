import React from 'react';

const NetIncomeChart = () => {
  // Placeholder for the chart data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Net Income</h3>
      <div className="h-48 w-full relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          {[7, 6, 5, 4, 3, 2, 1, 0].map(num => (
            <span key={num}>{num}</span>
          ))}
        </div>
        
        {/* Chart bars area */}
        <div className="ml-6 h-full flex items-end justify-between">
          {months.map((month, index) => (
            <div key={month} className="flex flex-col items-center w-10">
              {/* Random height for visualization */}
              <div 
                className={`w-2 ${
                  index % 3 === 0 ? 'bg-blue-500' : 
                  index % 3 === 1 ? 'bg-pink-500' : 'bg-yellow-500'
                }`} 
                style={{ height: `${Math.floor(Math.random() * 80) + 20}%` }}
              ></div>
              <span className="mt-2 text-xs text-gray-500">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetIncomeChart;
