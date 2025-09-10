import React from 'react';
import Image from 'next/image';
import { Logo } from '../common';

const LoginBranding = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center h-full bg-blue-600 text-white p-12 rounded-lg">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <Logo size="large" variant="white" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Face Recognition Attendance System</h1>
        <p className="text-lg mb-8">
          The modern solution for classroom attendance tracking using facial recognition technology.
        </p>
        
        <div className="relative w-full h-64 mb-8">
          <div className="w-full h-full relative">
            {/* Abstract shapes for decoration */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full opacity-10"></div>
            
            {/* Face recognition illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-40 h-40 text-white opacity-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Face outline */}
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Face recognition grid lines */}
                <path d="M8 10V9C8 7.9 8.9 7 10 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 10V9C16 7.9 15.1 7 14 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 14V15C8 16.1 8.9 17 10 17H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 14V15C16 16.1 15.1 17 14 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Eyes */}
                <circle cx="9" cy="10" r="1.25" fill="currentColor" />
                <circle cx="15" cy="10" r="1.25" fill="currentColor" />
                
                {/* Scanning lines */}
                <path d="M6 12H18" stroke="currentColor" strokeWidth="1" strokeDasharray="1 2" />
                <path d="M12 6V18" stroke="currentColor" strokeWidth="1" strokeDasharray="1 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <span className="w-2 h-2 bg-white rounded-full opacity-70"></span>
          <span className="w-2 h-2 bg-white rounded-full opacity-100"></span>
          <span className="w-2 h-2 bg-white rounded-full opacity-70"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginBranding;
