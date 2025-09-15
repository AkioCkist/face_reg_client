'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '../../hooks/useAuth';

export default function DebugAuth() {
  const { data: session, status } = useSession();
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="p-4 bg-gray-100 border rounded">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      <div className="space-y-1 text-sm">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}</p>
        <p><strong>Session:</strong> {session ? JSON.stringify(session, null, 2) : 'null'}</p>
      </div>
    </div>
  );
}