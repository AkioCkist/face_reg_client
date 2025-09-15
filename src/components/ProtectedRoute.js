'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      console.log('🔒 ProtectedRoute: No session found, redirecting to unauthorized');
      router.push('/unauthorized');
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      console.log(`🔒 ProtectedRoute: Access denied. User role: ${session.user.role}, Required roles: ${allowedRoles.join(', ')}`);
      router.push('/unauthorized');
      return;
    }

    console.log('✅ ProtectedRoute: Access granted for user:', session.user.id, 'role:', session.user.role);
  }, [session, status, router, allowedRoles]);

  // Show loading screen while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated or not authorized
  if (!session || (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role))) {
    return null;
  }

  return children;
}