import React from 'react';
import Link from 'next/link';

// TabNavigation is safe to render from server components. If an `onChange`
// handler is provided (from a client component), it will render interactive
// buttons. If no handler is provided, it will prefer `tab.href` and render
// Links so server components can use it without passing event handlers.
const TabNavigation = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const className = `
            whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
            ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          `;

          // If a client-side handler was provided, render a button.
          if (typeof onChange === 'function') {
            return (
              <button key={tab.id} onClick={() => onChange(tab.id)} className={className}>
                {tab.label}
              </button>
            );
          }

          // If tab provides a href, render a Next.js Link (safe in server components).
          if (tab.href) {
            return (
              <Link key={tab.id} href={tab.href} className={className}>
                {tab.label}
              </Link>
            );
          }

          // Fallback: render non-interactive element for server rendering.
          return (
            <div key={tab.id} className={className}>
              {tab.label}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;