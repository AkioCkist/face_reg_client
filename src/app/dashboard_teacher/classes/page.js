import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { PageHeader, Card, TabNavigation, Button } from '../../../components/ui';

export const metadata = {
  title: 'My Classes - Teacher Dashboard',
  description: 'Manage your classes and student attendance',
};

export default function ClassesPage() {
  return (
    <DashboardLayout userRole="teacher">
      <PageHeader 
        title="My Classes" 
        subtitle="Manage your classes and track student attendance"
        actions={
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Class
          </button>
        }
      />
      
      <div className="mb-6">
        <TabNavigation
          tabs={[
            { id: 'all', label: 'All Classes' },
            { id: 'active', label: 'Active Classes' },
            { id: 'archived', label: 'Archived' }
          ]}
          activeTab="all"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            id: 1, 
            code: 'CS101', 
            name: 'Introduction to Computer Science', 
            students: 35, 
            schedule: 'Mon, Wed, Fri', 
            time: '10:00 AM - 11:30 AM',
            room: '302',
            attendance: 92
          },
          { 
            id: 2, 
            code: 'CS201', 
            name: 'Data Structures & Algorithms', 
            students: 28, 
            schedule: 'Tue, Thu', 
            time: '1:00 PM - 2:30 PM',
            room: '201',
            attendance: 88
          },
          { 
            id: 3, 
            code: 'CS301', 
            name: 'Database Systems', 
            students: 30, 
            schedule: 'Mon, Wed', 
            time: '3:00 PM - 4:30 PM',
            room: '105',
            attendance: 95
          },
          { 
            id: 4, 
            code: 'AI401', 
            name: 'Artificial Intelligence', 
            students: 25, 
            schedule: 'Tue, Thu', 
            time: '9:00 AM - 10:30 AM',
            room: '401',
            attendance: 90
          },
          { 
            id: 5, 
            code: 'ML301', 
            name: 'Machine Learning', 
            students: 22, 
            schedule: 'Wed, Fri', 
            time: '1:00 PM - 2:30 PM',
            room: '305',
            attendance: 87
          },
          { 
            id: 6, 
            code: 'CS405', 
            name: 'Software Engineering', 
            students: 32, 
            schedule: 'Mon, Wed, Fri', 
            time: '11:00 AM - 12:30 PM',
            room: '201',
            attendance: 93
          },
        ].map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5 mb-2">
                    {course.code}
                  </span>
                  <h3 className="font-medium text-lg text-gray-900">{course.name}</h3>
                  <div className="mt-2 text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {course.students} Students
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {course.schedule}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.time}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Room {course.room}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200" strokeWidth="3"></circle>
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="16" 
                        fill="none" 
                        className="stroke-current text-blue-500" 
                        strokeWidth="3" 
                        strokeDasharray="100" 
                        strokeDashoffset={100 - course.attendance}
                      ></circle>
                    </svg>
                    <div className="absolute text-center text-sm font-medium text-blue-600">
                      {course.attendance}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex mt-6 space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  Take Attendance
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}