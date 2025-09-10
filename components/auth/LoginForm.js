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
      
      <div className="mt-8">
        <Divider>Or sign in with</Divider>
        
        <div className="mt-6 grid grid-cols-3 gap-3">
          <SocialButton
            provider="google"
            icon={
              <svg className="w-5 h-5" fill="#4285F4" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            }
          />
          <SocialButton
            provider="facebook"
            icon={
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M12.001,2.002c-5.522,0-9.999,4.477-9.999,9.999c0,4.99,3.656,9.126,8.437,9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508,1.493-3.891,3.776-3.891c1.094,0,2.24,0.195,2.24,0.195v2.459h-1.264c-1.24,0-1.628,0.772-1.628,1.563v1.875h2.771l-0.443,2.891h-2.328v6.988C18.344,21.129,22,16.992,22,12.001C22,6.479,17.523,2.002,12.001,2.002z"/>
              </svg>
            }
          />
          <SocialButton
            provider="twitter"
            icon={
              <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                <path d="M18.244,2.25h3.308l-7.227,8.26l8.502,11.24H16.17l-5.214-6.817L4.99,21.75H1.68l7.73-8.835L1.254,2.25H8.08l4.713,6.231L18.244,2.25z"/>
              </svg>
            }
          />
        </div>
      </div>
      
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
