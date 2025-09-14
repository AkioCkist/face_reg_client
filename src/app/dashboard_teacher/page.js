import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PageHeader, Card, StatCard, TabNavigation } from '../../components/ui';
import { WelcomeHeader } from '../../components/features/dashboard';

// Components for the teacher dashboard
import ClassesOverview from '../../components/features/attendance/ClassesOverview';
import AttendanceChart from '../../components/features/attendance/AttendanceChart';
import RecentAttendance from '../../components/features/attendance/RecentAttendance';

export const metadata = {
  title: 'Teacher Dashboard - Face Recognition Attendance System',
  description: 'Manage your classes and track attendance',
};

export default function TeacherDashboard() {
  return (
    <DashboardLayout userRole="teacher">
      <PageHeader 
        title="Teacher Dashboard" 
        subtitle="Welcome back! Here's what's happening with your classes today."
        actions={
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Start New Session
          </button>
        }
      />
      
      <WelcomeHeader name="Dr. Jennifer Wilkins" location="Computer Science Department" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Total Students" 
          value="127" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="blue"
          change="12%"
          isPositive={true}
        />
        
        <StatCard 
          title="Classes Today" 
          value="4" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="green"
        />
        
        <StatCard 
          title="Attendance Rate" 
          value="92.4%" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          color="amber"
          change="3.2%"
          isPositive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card title="Attendance Overview">
            <div className="h-80">
              {/* Placeholder for Attendance Chart */}
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center p-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-600">Attendance Chart will be displayed here</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Upcoming Classes">
            <div className="space-y-4">
              {[
                { id: 1, course: 'Introduction to AI', time: '10:00 AM - 11:30 AM', location: 'Room 302', students: 42 },
                { id: 2, course: 'Data Structures', time: '1:00 PM - 2:30 PM', location: 'Room 201', students: 38 },
                { id: 3, course: 'Machine Learning', time: '3:00 PM - 4:30 PM', location: 'Lab 105', students: 25 },
              ].map((session) => (
                <div key={session.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{session.course}</h4>
                      <div className="text-sm text-gray-500 mt-1">{session.time}</div>
                      <div className="text-sm text-gray-500">{session.location}</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {session.students} students
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Classes
              </button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                {[
                  { id: 1, student: 'Alex Johnson', class: 'Introduction to AI', time: '10:05 AM', status: 'present' },
                  { id: 2, student: 'Emma Davis', class: 'Introduction to AI', time: '10:00 AM', status: 'present' },
                  { id: 3, student: 'Michael Brown', class: 'Introduction to AI', time: '10:12 AM', status: 'late' },
                  { id: 4, student: 'Sophia Wilson', class: 'Introduction to AI', time: '—', status: 'absent' },
                  { id: 5, student: 'David Lee', class: 'Data Structures', time: '1:03 PM', status: 'present' },
                ].map((record) => (
                  <tr key={record.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.student}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{record.class}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                          record.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
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
        
        <Card title="Notifications">
          <div className="space-y-4">
            {[
              { id: 1, type: 'info', message: 'New student added to your Data Structures class', time: '10 minutes ago' },
              { id: 2, type: 'warning', message: 'Attendance for Machine Learning below 80% threshold', time: '2 hours ago' },
              { id: 3, type: 'success', message: 'Attendance report for last week has been generated', time: '1 day ago' },
              { id: 4, type: 'info', message: 'Department meeting scheduled for tomorrow at 9 AM', time: '1 day ago' },
            ].map((notification) => (
              <div key={notification.id} className="flex p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`flex-shrink-0 mr-3 mt-0.5
                  ${notification.type === 'info' ? 'text-blue-500' : 
                    notification.type === 'warning' ? 'text-amber-500' : 
                    notification.type === 'success' ? 'text-green-500' : 
                    'text-red-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {notification.type === 'info' && <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />}
                    {notification.type === 'warning' && <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />}
                    {notification.type === 'success' && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />}
                    {notification.type === 'error' && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />}
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All Notifications
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}