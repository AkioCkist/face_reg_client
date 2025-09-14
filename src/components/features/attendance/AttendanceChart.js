import React from 'react';
import { Card } from '../../ui';

const AttendanceChart = () => {
  return (
    <Card title="Attendance Overview">
      <div className="h-64">
        {/* This would be replaced with a real chart library like Chart.js or Recharts */}
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <div className="text-center p-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-600">Weekly attendance chart visualization</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceChart;