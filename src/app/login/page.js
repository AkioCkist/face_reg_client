import React from 'react';
import { LoginForm, LoginBranding } from '../../../components/auth';
import { Logo } from '../../../components/common';

export const metadata = {
  title: 'Login - Face Recognition Attendance System',
  description: 'Sign in to access your Face Recognition Attendance System',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl flex overflow-hidden rounded-xl shadow-lg">
        {/* Login Form Side */}
        <div className="w-full lg:w-1/2 bg-white p-8 md:p-12">
          <div className="flex flex-col h-full justify-center">
            <div className="mb-8 flex justify-center lg:justify-start">
              <Logo size="default" />
            </div>
            <LoginForm />
          </div>
        </div>
        
        {/* Branding Side */}
        <div className="hidden lg:block lg:w-1/2">
          <LoginBranding />
        </div>
      </div>
    </div>
  );
}
