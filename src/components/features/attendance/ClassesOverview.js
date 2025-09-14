import React from 'react';
import { Card } from '../../ui';

const ClassesOverview = ({ classes }) => {
  // Sample data if none provided
  const sampleClasses = classes || [
    { id: 1, name: 'Introduction to AI', students: 42, time: '10:00 AM' },
    { id: 2, name: 'Data Structures', students: 38, time: '1:00 PM' },
    { id: 3, name: 'Machine Learning', students: 25, time: '3:00 PM' },
  ];
  
  return (
    <Card title="Today's Classes">
      <div className="space-y-4">
        {sampleClasses.map((cls) => (
          <div key={cls.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0">
            <div>
              <h4 className="font-medium text-gray-800">{cls.name}</h4>
              <p className="text-sm text-gray-500">{cls.time} • {cls.students} students</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Start Session
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClassesOverview;