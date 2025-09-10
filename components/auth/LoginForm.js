import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Input, Checkbox, Divider, SocialButton } from '../common';

const LoginForm = () => {
  return (
    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-800">Sign in to continue to your account</p>
      </div>
      
      <form className="space-y-6">
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
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
            type="password"
            placeholder="Enter your password"
          />
        </div>
        
        <Checkbox 
          id="remember-me"
          name="remember-me"
          label="Remember me"
        />
        
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
        >
          Sign In
        </Button>
      </form>       
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
