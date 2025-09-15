import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PageHeader, Card, StatCard, TabNavigation } from '../../components/ui';
import { UserManagementModal, UserListTable } from '../../components/features/admin';
import UserService from '../../lib/services/user.service';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Client-side route protection
  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      console.log('No session found, redirecting to unauthorized page');
      router.push('/unauthorized');
      return;
    }

    if (session.user.role !== 'admin') {
      console.log('Access denied: User role is', session.user.role, 'but admin required');
      router.push('/unauthorized');
      return;
    }
  }, [session, status, router]);

  // Show loading screen while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated or not admin
  if (!session || session.user.role !== 'admin') {
    return null;
  }

  const handleNewUserClick = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      setRefreshTrigger(prev => prev + 1);
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting user:', error);
      return Promise.reject(error);
    }
  };

  const handleSaveUser = async (userData, action) => {
    try {
      if (action === 'create') {
        await UserService.createUser(userData);
      } else if (action === 'edit') {
        await UserService.updateUser(userData.id, userData);
      }
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart' },
    { id: 'users', label: 'User Management', icon: 'users' }
  ];
  return (
    <DashboardLayout userRole="admin">
      <PageHeader 
        title="Admin Dashboard" 
        subtitle={activeTab === 'dashboard' ? 'System overview and management' : 'Manage users and permissions'}
        actions={
          <div className="flex gap-3">
            {activeTab === 'users' && (
              <button 
                onClick={handleNewUserClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New User
              </button>
            )}
            {activeTab === 'dashboard' && (
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Report
              </button>
            )}
          </div>
        }
      />
      
      {/* Tab Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon === 'chart' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )}
              {tab.icon === 'users' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div>
          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Users" 
          value="1,254" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="blue"
          change="12%"
          isPositive={true}
        />
        
        <StatCard 
          title="Active Classes" 
          value="42" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          color="green"
          change="8%"
          isPositive={true}
        />
        
        <StatCard 
          title="System Uptime" 
          value="99.9%" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          color="amber"
        />
        
        <StatCard 
          title="Storage Used" 
          value="64%" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          }
          color="purple"
          change="5%"
          isPositive={false}
        />
      </div>
      
      {/* User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card title="System Activity">
            <div className="h-80">
              {/* Placeholder for Activity Chart */}
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center p-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-gray-600">System activity and usage trends over time</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="User Distribution">
            <div className="space-y-6">
              {[
                { id: 1, role: 'Students', count: 1082, percentage: 86, color: 'bg-blue-500' },
                { id: 2, role: 'Teachers', count: 124, percentage: 10, color: 'bg-green-500' },
                { id: 3, role: 'Admins', count: 48, percentage: 4, color: 'bg-purple-500' },
              ].map((userType) => (
                <div key={userType.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">{userType.role}</h4>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{userType.count}</span>
                      <span className="text-sm font-medium text-gray-900">{userType.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${userType.color}`} 
                      style={{ width: `${userType.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View User Management
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Recent Activity and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activities">
          <div className="space-y-4">
            {[
              { id: 1, action: 'User Created', details: 'New student account for Emma Thompson', time: '10 minutes ago', icon: 'user-add' },
              { id: 2, action: 'Class Added', details: 'Introduction to Cybersecurity (CS302) added', time: '1 hour ago', icon: 'class-add' },
              { id: 3, action: 'System Update', details: 'Face recognition engine updated to v2.4.1', time: '3 hours ago', icon: 'update' },
              { id: 4, action: 'Backup Completed', details: 'Database backup completed successfully', time: '6 hours ago', icon: 'backup' },
              { id: 5, action: 'User Deleted', details: 'Former student John Miller removed', time: '1 day ago', icon: 'user-remove' },
            ].map((activity) => (
              <div key={activity.id} className="flex p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mr-3">
                  {activity.icon === 'user-add' && (
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                  )}
                  {activity.icon === 'class-add' && (
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                  )}
                  {activity.icon === 'update' && (
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  )}
                  {activity.icon === 'backup' && (
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                  )}
                  {activity.icon === 'user-remove' && (
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{activity.action}</h4>
                  <p className="text-sm text-gray-500 mt-1">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All Activities
            </button>
          </div>
        </Card>
        
        <Card title="System Status">
          <div className="space-y-6">
            {[
              { id: 1, name: 'Face Recognition API', status: 'operational', uptime: '99.98%', response: '245ms' },
              { id: 2, name: 'Database', status: 'operational', uptime: '99.99%', response: '42ms' },
              { id: 3, name: 'Authentication Service', status: 'operational', uptime: '100%', response: '120ms' },
              { id: 4, name: 'Storage System', status: 'degraded', uptime: '99.85%', response: '350ms' },
              { id: 5, name: 'Notification Service', status: 'operational', uptime: '99.95%', response: '180ms' },
            ].map((service) => (
              <div key={service.id} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{service.name}</h4>
                  <div className="flex items-center mt-1">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      service.status === 'operational' ? 'bg-green-500' : 
                      service.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-xs text-gray-500 capitalize">{service.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Uptime: {service.uptime}</div>
                  <div className="text-xs text-gray-400">Response: {service.response}</div>
                </div>
              </div>
            ))}
            
            <div className="pt-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View System Metrics
              </button>
            </div>
          </div>
        </Card>
      </div>
        </div>
      )}

      {/* User Management Content */}
      {activeTab === 'users' && (
        <div>
          <UserListTable 
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            refreshTrigger={refreshTrigger}
          />
        </div>
      )}

      {/* User Management Modal */}
      <UserManagementModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </DashboardLayout>
  );
}