import React from 'react';

const InboxCard = ({ messageCount }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700">Inbox</h3>
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">{messageCount}</h2>
        <div className="w-24 h-24 relative">
          {/* Placeholder for the illustration */}
          <div className="w-full h-full bg-contain bg-no-repeat bg-right-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default InboxCard;
