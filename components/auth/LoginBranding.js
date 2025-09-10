import React from 'react';
import Image from 'next/image';
import { Logo } from '../common';

const LoginBranding = () => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center h-full bg-blue-600 text-white p-12 rounded-lg">
      <div className="max-w-md text-center">
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
              <div className="absolute w-50 h-50 rounded-full bg-white/70 opacity-40"></div>
              <Image src="/icon.svg" alt="Face recognition logo" width={160} height={160} className="w-40 h-40 opacity-100 relative z-10" />
            </div>
          </div>
        </div>      
      </div>
    </div>
  );
};

export default LoginBranding;
