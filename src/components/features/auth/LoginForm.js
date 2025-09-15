"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Input, Checkbox, Divider, SocialButton } from '../../ui';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        userId: formData.userId,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else if (result?.ok) {
        // NextAuth handles the session, redirect based on role
        // We'll need to get the session to check the role
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        if (session?.user?.role === 'student') {
          router.push('/dashboard_student');
        } else if (session?.user?.role === 'teacher') {
          router.push('/dashboard_teacher');
        } else if (session?.user?.role === 'admin') {
          router.push('/dashboard_admin');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-800">Sign in to continue to your account</p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        <Input
          id="userId"
          name="userId"
          type="text"
          label="ID"
          placeholder="Enter your ID"
          value={formData.userId}
          onChange={handleInputChange}
          required
        />
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <Checkbox 
          id="remember-me"
          name="rememberMe"
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>       
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
