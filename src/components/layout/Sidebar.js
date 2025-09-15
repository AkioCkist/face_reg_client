"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserAvatar, Logo } from '../ui';
import { signOut } from 'next-auth/react';

const Sidebar = ({ userRole = 'student' }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  const commonItems = [
    { id: 'profile', icon: 'user', label: 'Profile', href: userRole === 'admin' ? '/admin/profile' : `/dashboard_${userRole}/profile` },
  ];

  const roleMenus = {
    teacher: [
      { id: 'dashboard', icon: 'grid', label: 'Dashboard', href: '/dashboard_teacher' },
      { id: 'classes', icon: 'users', label: 'My Classes', href: '/dashboard_teacher/classes' },
      { id: 'attendance', icon: 'check-square', label: 'Attendance', href: '/dashboard_teacher/attendance' },
      { id: 'reports', icon: 'bar-chart', label: 'Reports', href: '/dashboard_teacher/reports' },
      ...commonItems,
      { id: 'settings', icon: 'settings', label: 'Settings', href: '/dashboard_teacher/settings' },
    ],
    student: [
      { id: 'dashboard', icon: 'grid', label: 'Dashboard', href: '/dashboard_student' },
      { id: 'courses', icon: 'book', label: 'My Courses', href: '/dashboard_student/courses' },
      { id: 'attendance', icon: 'check-square', label: 'My Attendance', href: '/dashboard_student/attendance' },
      ...commonItems,
      { id: 'settings', icon: 'settings', label: 'Settings', href: '/dashboard_student/settings' },
    ],
    admin: [
      { id: 'dashboard', icon: 'grid', label: 'Dashboard', href: '/admin' },
      { id: 'users', icon: 'users', label: 'User Management', href: '/admin/users' },
      { id: 'classes', icon: 'layout', label: 'Classes', href: '/admin/classes' },
      { id: 'logs', icon: 'clipboard', label: 'System Logs', href: '/admin/logs' },
      { id: 'settings', icon: 'sliders', label: 'System Settings', href: '/admin/settings' },
      ...commonItems,
    ],
  };

  const menuItems = roleMenus[userRole] || commonItems;

  const getIcon = (iconName) => {
    const iconClasses = 'w-5 h-5';
    switch (iconName) {
      case 'grid':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'check-square':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'bar-chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'layout':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case 'sliders':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case 'clipboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
    }
  };

  return (
    <aside className={`${expanded ? 'w-64' : 'w-20'} bg-white h-screen shadow-sm flex flex-col transition-all duration-300 z-20 relative`}>
      {/* Toggle button positioned at the right edge center of the sidebar (half outside) */}
      <button
        onClick={() => setExpanded((s) => !s)}
        className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 p-0 rounded-full z-30"
        aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {/* white circular background for the toggle */}
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-gray-100 text-gray-500 hover:bg-gray-50 transition-colors">
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </div>
      </button>

      {/* Logo / branding */}
      <div className="h-16 relative px-4 border-b border-gray-100 flex items-center">
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${expanded ? 'left-1/2 -translate-x-1/2' : 'left-4 -translate-x-0'}`}>
          {expanded ? <Logo size="default" variant="default" /> : <Logo bare size="small" variant="default" />}
        </div>
      </div>

      {/* User area */}
      <div className={`py-4 px-4 border-b border-gray-100 ${!expanded ? 'flex justify-center' : ''}`}>
        {expanded ? (
          <div className="flex items-center">
            <UserAvatar name="John Doe" size="md" status="online" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        ) : (
          <UserAvatar name="John Doe" size="md" status="online" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'} ${!expanded ? 'justify-center' : ''}`}>
                  <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                  {expanded && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out ${!expanded ? 'justify-center' : ''} text-gray-600 hover:bg-red-50 hover:text-red-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {expanded && <span className="transition-colors duration-150 group-hover:text-red-600">Log Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
