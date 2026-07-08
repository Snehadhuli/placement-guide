import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'student' | 'alumni' | 'tpo') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'alumni' | 'tpo',
    name: '',
    college: '',
    graduationYear: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = db.loginUser(formData.email, formData.password, formData.role);
      if (res.success && res.user) {
        onLogin(res.user.role);
        navigate('/dashboard');
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const res = db.registerUser({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        name: formData.name,
        college: formData.college || undefined,
        graduationYear: formData.graduationYear || undefined
      });
      if (res.success) {
        const loginRes = db.loginUser(formData.email, formData.password, formData.role);
        if (loginRes.success && loginRes.user) {
          onLogin(loginRes.user.role);
          navigate('/dashboard');
        }
      } else {
        setError(res.error || 'Signup failed.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Placement Guide
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back!' : 'Join Placement Guide'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to access your placement dashboard' 
              : 'Create your account to start your placement journey'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm font-medium">
                {error}
              </div>
            )}
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="tpo">TPO (Training & Placement Officer)</option>
              </select>
            </div>

            {/* Name (for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* College (for students and alumni signup) */}
            {!isLogin && formData.role !== 'tpo' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College/University
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your college name"
                  required
                />
              </div>
            )}

            {/* Graduation Year (for students and alumni signup) */}
            {!isLogin && formData.role !== 'tpo' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.role === 'student' ? 'Expected Graduation Year' : 'Graduation Year'}
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2025"
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center font-semibold"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        {!isLogin && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll get:</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Access to exclusive placement drives</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Connect with successful alumni mentors</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Share and read placement experiences</span>
              </div>
              <div className="flex items-center text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Personalized job recommendations</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;