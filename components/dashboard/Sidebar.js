import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { id: 1, title: 'Dashboard', icon: 'grid', href: '#' },
    { id: 2, title: 'Student Profile', icon: 'layout', href: '#' },
    { id: 3, title: 'Statistics', icon: 'file', href: '#' },
  ];

  return (
    <aside className="w-[200px] bg-white h-screen p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-8">
        <div className="text-blue-600 font-bold text-xl">Advertda</div>
      </div>
      
      <div className="mb-6">
        <Link href="#" className="flex items-center gap-2 bg-blue-50 text-blue-600 p-3 rounded-lg">
          <span className="bg-blue-100 p-1 rounded">+</span>
          <span className="text-sm font-medium">Create New</span>
        </Link>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <span className="text-sm font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
