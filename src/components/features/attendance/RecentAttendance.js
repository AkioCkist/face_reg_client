import React from 'react';
import { Card, AttendanceStatusBadge } from '../../ui';

const RecentAttendance = ({ records }) => {
  // Sample data if none provided
  const sampleRecords = records || [
    { id: 1, student: 'Alex Johnson', class: 'Introduction to AI', time: '10:05 AM', status: 'present' },
    { id: 2, student: 'Emma Davis', class: 'Introduction to AI', time: '10:00 AM', status: 'present' },
    { id: 3, student: 'Michael Brown', class: 'Introduction to AI', time: '10:12 AM', status: 'late' },
    { id: 4, student: 'Sophia Wilson', class: 'Introduction to AI', time: '—', status: 'absent' },
    { id: 5, student: 'David Lee', class: 'Data Structures', time: '1:03 PM', status: 'present' },
  ];
  
  return (
    <Card title="Recent Attendance">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.student}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{record.class}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <AttendanceStatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Records
        </button>
      </div>
    </Card>
  );
};

export default RecentAttendance;