import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { PageHeader, Card, TabNavigation } from '../../../components/ui';

export const metadata = {
  title: 'My Courses - Student Dashboard',
  description: 'View your enrolled courses and course details',
};

export default function CoursesPage() {
  return (
    <DashboardLayout userRole="student">
      <PageHeader 
        title="My Courses" 
        subtitle="View your enrolled courses, schedule, and attendance"
      />
      
      <div className="mb-6">
        <TabNavigation
          tabs={[
            { id: 'all', label: 'All Courses' },
            { id: 'active', label: 'Current Semester' },
            { id: 'completed', label: 'Completed' }
          ]}
          activeTab="active"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            id: 1, 
            code: 'CS201', 
            name: 'Data Structures & Algorithms', 
            instructor: 'Dr. Jennifer Wilkins', 
            schedule: 'Mon, Wed', 
            time: '10:00 AM - 11:30 AM',
            room: '201',
            attendance: 96,
            color: 'from-blue-500 to-cyan-400'
          },
          { 
            id: 2, 
            code: 'ML301', 
            name: 'Machine Learning', 
            instructor: 'Prof. Michael Chen', 
            schedule: 'Tue, Thu', 
            time: '1:00 PM - 2:30 PM',
            room: '105',
            attendance: 87,
            color: 'from-purple-500 to-indigo-400'
          },
          { 
            id: 3, 
            code: 'CS405', 
            name: 'Software Engineering', 
            instructor: 'Dr. Sarah Johnson', 
            schedule: 'Wed, Fri', 
            time: '3:00 PM - 4:30 PM',
            room: '304',
            attendance: 92,
            color: 'from-green-500 to-emerald-400'
          },
          { 
            id: 4, 
            code: 'AI401', 
            name: 'Introduction to AI', 
            instructor: 'Dr. Robert Lee', 
            schedule: 'Tue, Thu', 
            time: '10:00 AM - 11:30 AM',
            room: '401',
            attendance: 78,
            color: 'from-amber-500 to-yellow-400'
          },
          { 
            id: 5, 
            code: 'CS301', 
            name: 'Database Systems', 
            instructor: 'Prof. Lisa Wang', 
            schedule: 'Mon, Wed, Fri', 
            time: '1:00 PM - 2:30 PM',
            room: '102',
            attendance: 94,
            color: 'from-red-500 to-rose-400'
          },
          { 
            id: 6, 
            code: 'NW202', 
            name: 'Computer Networks', 
            instructor: 'Dr. James Wilson', 
            schedule: 'Tue, Thu', 
            time: '3:00 PM - 4:30 PM',
            room: '203',
            attendance: 91,
            color: 'from-sky-500 to-blue-400'
          },
        ].map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-3 bg-gradient-to-r ${course.color}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 rounded-full px-2.5 py-0.5 mb-2">
                    {course.code}
                  </span>
                  <h3 className="font-medium text-lg text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
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
                    <div className="absolute text-center text-xs font-medium text-blue-600">
                      {course.attendance}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500 space-y-1">
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
              
              <div className="flex mt-6 space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  Course Details
                </button>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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