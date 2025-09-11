import React from 'react';
import Image from 'next/image';

const Header = ({ user }) => {
  return (
    <div className="flex justify-end items-center mb-6 gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          {/* Search icon placeholder */}
          🔍
        </span>
      </div>
      <div className="relative">
        <span className="text-gray-400 text-xl">
          {/* Notification icon placeholder */}
          🔔
        </span>
      </div>
      <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden">
        {user?.image ? (
          <Image 
            src={user.image} 
            alt={user.name} 
            width={32} 
            height={32}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
            {user?.name?.charAt(0) || 'U'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
