import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PageHeader, Card, StatCard, TabNavigation } from '../../components/ui';
import { WelcomeHeader } from '../../components/features/dashboard';

export const metadata = {
  title: 'Student Dashboard - Face Recognition Attendance System',
  description: 'Track your attendance and course information',
};

export default function StudentDashboard() {
  return (
    <DashboardLayout userRole="student">
      <PageHeader 
        title="Student Dashboard" 
        subtitle="Welcome to your attendance portal. Track your attendance and upcoming classes."
      />
      
      <WelcomeHeader name="Alex Johnson" location="Computer Science, Year 3" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Attendance Rate" 
          value="94.2%" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          color="green"
          change="1.5%"
          isPositive={true}
        />
        
        <StatCard 
          title="Enrolled Courses" 
          value="6" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
          color="blue"
        />
        
        <StatCard 
          title="Classes Today" 
          value="3" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card title="My Attendance Overview">
            <div className="h-80">
              {/* Placeholder for Attendance Chart */}
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center p-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-600">Your attendance trends over time</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Today's Schedule">
            <div className="space-y-4">
              {[
                { id: 1, course: 'Data Structures', time: '10:00 AM - 11:30 AM', location: 'Room 201', status: 'upcoming' },
                { id: 2, course: 'Machine Learning', time: '1:00 PM - 2:30 PM', location: 'Lab 105', status: 'upcoming' },
                { id: 3, course: 'Software Engineering', time: '3:00 PM - 4:30 PM', location: 'Room 304', status: 'upcoming' },
              ].map((session) => (
                <div key={session.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{session.course}</h4>
                      <div className="text-sm text-gray-500 mt-1">{session.time}</div>
                      <div className="text-sm text-gray-500">{session.location}</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {session.status === 'upcoming' ? 'Upcoming' : session.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View Full Schedule
              </button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Attendance Records">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, course: 'Introduction to AI', date: 'Sep 13, 2023', time: '10:05 AM', status: 'present' },
                  { id: 2, course: 'Data Structures', date: 'Sep 13, 2023', time: '1:00 PM', status: 'present' },
                  { id: 3, course: 'Machine Learning', date: 'Sep 12, 2023', time: '3:12 PM', status: 'late' },
                  { id: 4, course: 'Software Engineering', date: 'Sep 12, 2023', time: '—', status: 'absent' },
                  { id: 5, course: 'Database Systems', date: 'Sep 11, 2023', time: '10:03 AM', status: 'present' },
                ].map((record) => (
                  <tr key={record.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.course}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
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
        
        <Card title="Course Performance">
          <div className="space-y-6">
            {[
              { id: 1, course: 'Data Structures', code: 'CS201', attendance: 96, color: 'bg-green-500' },
              { id: 2, course: 'Machine Learning', code: 'ML301', attendance: 87, color: 'bg-blue-500' },
              { id: 3, course: 'Software Engineering', code: 'CS405', attendance: 92, color: 'bg-purple-500' },
              { id: 4, course: 'Introduction to AI', code: 'AI401', attendance: 78, color: 'bg-yellow-500' },
            ].map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">{course.course}</h4>
                    <p className="text-xs text-gray-500">{course.code}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{course.attendance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${course.color}`} 
                    style={{ width: `${course.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}