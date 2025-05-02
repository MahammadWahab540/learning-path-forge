
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { toast } from "sonner";

// Define schemas for login and register
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { login, register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  // Setup React Hook Form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      // Navigation is handled in the AuthContext
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.email, data.password, data.firstName, data.lastName);
      // Navigation is handled in the AuthContext
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleGoogleAuth = () => {
    toast.info("Google OAuth not implemented in this demo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-auth-gradient p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Logo Icon */}
        <div className="flex justify-center mt-8 mb-4">
          <div className="p-3 bg-brand-purple rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-8 h-8 text-white"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" 
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-center text-2xl font-bold mb-6">MultiLang SkillSpark</h2>
        
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'login'
                ? 'text-brand-purple border-b-2 border-brand-purple'
                : 'text-gray-500 hover:text-brand-purple/70'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'register'
                ? 'text-brand-purple border-b-2 border-brand-purple'
                : 'text-gray-500 hover:text-brand-purple/70'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                id="email"
                placeholder="your.email@example.com"
                {...loginForm.register('email')}
                error={loginForm.formState.errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="••••••"
                {...loginForm.register('password')}
                error={loginForm.formState.errors.password?.message}
              />
              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={loading}
                >
                  Sign In
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  id="firstName"
                  placeholder="John"
                  {...registerForm.register('firstName')}
                  error={registerForm.formState.errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  {...registerForm.register('lastName')}
                  error={registerForm.formState.errors.lastName?.message}
                />
              </div>
              <Input
                label="Email Address"
                type="email"
                id="register-email"
                placeholder="your.email@example.com"
                {...registerForm.register('email')}
                error={registerForm.formState.errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                id="register-password"
                placeholder="••••••"
                {...registerForm.register('password')}
                error={registerForm.formState.errors.password?.message}
              />
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="••••••"
                {...registerForm.register('confirmPassword')}
                error={registerForm.formState.errors.confirmPassword?.message}
              />
              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={loading}
                >
                  Create Account
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <button
              type="button"
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              onClick={handleGoogleAuth}
            >
              <div className="flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Google
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
