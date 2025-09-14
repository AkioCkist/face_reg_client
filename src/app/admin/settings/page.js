import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { PageHeader, Card } from '../../../components/ui';

export const metadata = {
  title: 'System Settings - Admin Dashboard',
  description: 'Configure system settings and preferences',
};

export default function SystemSettingsPage() {
  return (
    <DashboardLayout userRole="admin">
      <PageHeader 
        title="System Settings" 
        subtitle="Configure and manage system settings and preferences"
        actions={
          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        }
      />
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Settings Categories</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <a href="#general" className="block px-4 py-3 bg-blue-50 text-blue-600 hover:bg-blue-50 font-medium">
                General Settings
              </a>
              <a href="#appearance" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Appearance
              </a>
              <a href="#security" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Security & Privacy
              </a>
              <a href="#notifications" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Notifications
              </a>
              <a href="#integrations" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Integrations
              </a>
              <a href="#backup" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Backup & Restore
              </a>
              <a href="#facerecognition" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Face Recognition
              </a>
              <a href="#attendance" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Attendance Settings
              </a>
              <a href="#about" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                About System
              </a>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          {/* General Settings */}
          <div id="general" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure basic system settings and preferences</p>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                    System Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="site-name"
                      id="site-name"
                      defaultValue="FaceReg Attendance System"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="site-url" className="block text-sm font-medium text-gray-700">
                    System URL
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="site-url"
                      id="site-url"
                      defaultValue="https://attendance.example.com"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">
                    Administrator Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="admin-email"
                      id="admin-email"
                      defaultValue="admin@example.com"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Default Language
                  </label>
                  <div className="mt-1">
                    <select
                      id="language"
                      name="language"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Default Timezone
                  </label>
                  <div className="mt-1">
                    <select
                      id="timezone"
                      name="timezone"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                      <option value="Europe/London">London</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="maintenance-mode"
                        name="maintenance-mode"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="maintenance-mode" className="font-medium text-gray-700">
                        Enable Maintenance Mode
                      </label>
                      <p className="text-gray-500">When enabled, only administrators can access the system.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Face Recognition Settings */}
          <div id="facerecognition" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Face Recognition Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure face recognition parameters and thresholds</p>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="confidence-threshold" className="block text-sm font-medium text-gray-700">
                    Confidence Threshold (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="confidence-threshold"
                      id="confidence-threshold"
                      min="50"
                      max="100"
                      defaultValue="85"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Minimum confidence level required for a positive match (50-100)</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="recognition-model" className="block text-sm font-medium text-gray-700">
                    Recognition Model
                  </label>
                  <div className="mt-1">
                    <select
                      id="recognition-model"
                      name="recognition-model"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="standard">Standard (Balanced)</option>
                      <option value="fast">Fast (Lower accuracy)</option>
                      <option value="accurate">Accurate (Slower)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="max-faces" className="block text-sm font-medium text-gray-700">
                    Maximum Faces Per Frame
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="max-faces"
                      id="max-faces"
                      min="1"
                      max="20"
                      defaultValue="5"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="detection-frequency" className="block text-sm font-medium text-gray-700">
                    Detection Frequency (ms)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="detection-frequency"
                      id="detection-frequency"
                      min="100"
                      max="2000"
                      step="100"
                      defaultValue="500"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">How often to run detection (milliseconds)</p>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="liveness-detection"
                        name="liveness-detection"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="liveness-detection" className="font-medium text-gray-700">
                        Enable Liveness Detection
                      </label>
                      <p className="text-gray-500">Detect if the face is from a real person and not a photo or screen.</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="store-face-logs"
                        name="store-face-logs"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="store-face-logs" className="font-medium text-gray-700">
                        Store Face Recognition Logs
                      </label>
                      <p className="text-gray-500">Save face detection logs for troubleshooting and analysis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Settings */}
          <div id="attendance" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Attendance Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure attendance tracking and reporting preferences</p>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="attendance-window" className="block text-sm font-medium text-gray-700">
                    Attendance Window (minutes)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="attendance-window"
                      id="attendance-window"
                      min="5"
                      max="60"
                      defaultValue="15"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Time window for marking attendance as 'on time'</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="late-threshold" className="block text-sm font-medium text-gray-700">
                    Late Threshold (minutes)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="late-threshold"
                      id="late-threshold"
                      min="1"
                      max="60"
                      defaultValue="10"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Minutes after class start to mark as 'late'</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="absence-threshold" className="block text-sm font-medium text-gray-700">
                    Absence Threshold (%)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="absence-threshold"
                      id="absence-threshold"
                      min="0"
                      max="100"
                      defaultValue="25"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Percentage of missed classes to mark as 'at risk'</p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="attendance-report-day" className="block text-sm font-medium text-gray-700">
                    Weekly Report Day
                  </label>
                  <div className="mt-1">
                    <select
                      id="attendance-report-day"
                      name="attendance-report-day"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="auto-notifications"
                        name="auto-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="auto-notifications" className="font-medium text-gray-700">
                        Automatic Absence Notifications
                      </label>
                      <p className="text-gray-500">Send automatic notifications for absences to students and teachers.</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="teacher-edit-attendance"
                        name="teacher-edit-attendance"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="teacher-edit-attendance" className="font-medium text-gray-700">
                        Allow Teachers to Edit Attendance
                      </label>
                      <p className="text-gray-500">Teachers can manually modify attendance records.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div id="security" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Security & Privacy</h3>
              <p className="mt-1 text-sm text-gray-500">Configure security settings and privacy options</p>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
                    Session Timeout (minutes)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="session-timeout"
                      id="session-timeout"
                      min="5"
                      max="180"
                      defaultValue="30"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="password-policy" className="block text-sm font-medium text-gray-700">
                    Password Policy
                  </label>
                  <div className="mt-1">
                    <select
                      id="password-policy"
                      name="password-policy"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="standard">Standard (8+ chars, 1 number)</option>
                      <option value="strong">Strong (8+ chars, number, symbol, mixed case)</option>
                      <option value="very-strong">Very Strong (12+ chars, numbers, symbols, mixed case)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="two-factor-auth"
                        name="two-factor-auth"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="two-factor-auth" className="font-medium text-gray-700">
                        Enforce Two-Factor Authentication for Admins
                      </label>
                      <p className="text-gray-500">Require 2FA for all administrator accounts.</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="data-anonymization"
                        name="data-anonymization"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="data-anonymization" className="font-medium text-gray-700">
                        Anonymize Data in Reports
                      </label>
                      <p className="text-gray-500">Hide personal identifiers in exported reports.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About System */}
          <div id="about" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">About System</h3>
              <p className="mt-1 text-sm text-gray-500">System information and version details</p>
            </div>
            <div className="p-4 sm:p-6">
              <dl className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Version</dt>
                  <dd className="mt-1 text-sm text-gray-900">1.2.5</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">October 15, 2023</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">License</dt>
                  <dd className="mt-1 text-sm text-gray-900">Enterprise</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Support Expires</dt>
                  <dd className="mt-1 text-sm text-gray-900">December 31, 2024</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Check for Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}