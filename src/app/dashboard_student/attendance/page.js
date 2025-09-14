import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { PageHeader, Card, TabNavigation, AttendanceStatusBadge } from '../../../components/ui';

export const metadata = {
  title: 'My Attendance - Student Dashboard',
  description: 'View and track your attendance records',
};

export default function StudentAttendancePage() {
  return (
    <DashboardLayout userRole="student">
      <PageHeader 
        title="My Attendance" 
        subtitle="Track your attendance records across all your courses"
        actions={
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </button>
        }
      />
      
      {/* Course Selection and Date Filtering */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
          <select
            id="course-select"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Courses</option>
            <option value="cs201">CS201 - Data Structures</option>
            <option value="ml301">ML301 - Machine Learning</option>
            <option value="cs405">CS405 - Software Engineering</option>
            <option value="ai401">AI401 - Introduction to AI</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select
            id="date-select"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-semester">This Semester</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status-select"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="excused">Excused</option>
          </select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-green-50 border-green-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Present</p>
              <p className="text-2xl font-bold text-green-900">42</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-red-50 border-red-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Absent</p>
              <p className="text-2xl font-bold text-red-900">3</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-amber-50 border-amber-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Late</p>
              <p className="text-2xl font-bold text-amber-900">5</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-blue-50 border-blue-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-900">94.2%</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Attendance Chart */}
      <Card className="mb-6">
        <div className="h-64">
          {/* This would be replaced with a real chart library like Chart.js or Recharts */}
          <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="text-center p-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-600">Your attendance trends over time by course</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Attendance Records Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, course: 'Data Structures', date: 'Sep 13, 2023', time: '10:05 AM', status: 'present', notes: '' },
                { id: 2, course: 'Machine Learning', date: 'Sep 13, 2023', time: '1:07 PM', status: 'present', notes: '' },
                { id: 3, course: 'Software Engineering', date: 'Sep 13, 2023', time: '3:12 PM', status: 'late', notes: 'Arrived 12 minutes late' },
                { id: 4, course: 'Introduction to AI', date: 'Sep 12, 2023', time: '10:00 AM', status: 'present', notes: '' },
                { id: 5, course: 'Data Structures', date: 'Sep 12, 2023', time: '—', status: 'absent', notes: 'Medical absence' },
                { id: 6, course: 'Machine Learning', date: 'Sep 12, 2023', time: '1:00 PM', status: 'present', notes: '' },
                { id: 7, course: 'Software Engineering', date: 'Sep 12, 2023', time: '3:02 PM', status: 'present', notes: '' },
                { id: 8, course: 'Introduction to AI', date: 'Sep 11, 2023', time: '10:05 AM', status: 'present', notes: '' },
                { id: 9, course: 'Data Structures', date: 'Sep 11, 2023', time: '10:14 AM', status: 'late', notes: 'Arrived 14 minutes late' },
                { id: 10, course: 'Machine Learning', date: 'Sep 11, 2023', time: '1:00 PM', status: 'present', notes: '' },
              ].map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <AttendanceStatusBadge status={record.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.notes || '—'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">50</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  5
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}