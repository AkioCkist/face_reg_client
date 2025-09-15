'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../../components/ui';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // If user is already authenticated, redirect to appropriate dashboard
    if (session?.user) {
      const { role } = session.user;
      if (role === 'student') {
        router.push('/dashboard_student');
      } else if (role === 'teacher') {
        router.push('/dashboard_teacher');
      } else if (role === 'admin') {
        router.push('/dashboard_admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [session, router]);

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Lock Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You need to be logged in to access this page.
          </p>

          {/* Action Buttons */}
          <div className="space-y-6">
            <Link href="/login" className="block w-full">
              <Button
                variant="primary"
                size="large"
                fullWidth
              >
                Sign In to Continue
              </Button>
            </Link>
            
            <Link href="/" className="block w-full">
              <Button
                variant="outline"
                size="large"
                fullWidth
              >
                Go to Home Page
              </Button>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Need help?</strong> Contact your administrator if you believe you should have access to this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}