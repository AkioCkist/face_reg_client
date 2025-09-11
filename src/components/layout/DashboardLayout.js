import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
