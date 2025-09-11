import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AuthService.login(credentials);
      setUser(result.user);
      return result;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AuthService.register(userData);
      return result;
    } catch (err) {
      console.error('Register error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error('Refresh user error:', err);
      setUser(null);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    refreshUser,
    isAuthenticated: !!user,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student'
  };
};
