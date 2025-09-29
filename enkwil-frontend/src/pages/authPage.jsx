import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Book, GraduationCap, BookOpen, PenTool, Library, FlaskConical, ClipboardCheck, Calculator, Globe, Eye, EyeOff, User, Mail, Lock, UserPlus, LogIn } from "lucide-react";

// Array of educational icons to use for the background animation
const floatingIcons = [Book, GraduationCap, BookOpen, PenTool, Library, FlaskConical, ClipboardCheck, Calculator, Globe];

// Array of colors for the icons
const iconColors = ["text-sky-400", "text-teal-400", "text-purple-400", "text-pink-400", "text-yellow-400", "text-red-400"];

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // Hardcoded sign-in function
  const handleSignIn = async (email, password) => {
    try {
      const response = await fetch('https://enkwil-foundation.onrender.com/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  };

  // Hardcoded sign-up function
  const handleSignUp = async (name, email, password) => {
    try {
      const response = await fetch('https://enkwil-foundation.onrender.com/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Sign-up error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!isSignIn && !formData.name) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      let data;
      
      if (isSignIn) {
        // Hardcoded sign-in call
        console.log('Attempting sign-in with:', formData.email);
        data = await handleSignIn(formData.email, formData.password);
      } else {
        // Hardcoded sign-up call
        console.log('Attempting sign-up with:', formData.name, formData.email);
        data = await handleSignUp(formData.name, formData.email, formData.password);
      }

      console.log('API Response:', data);

      if (isSignIn) {
        // Handle sign-in success
        const { token, user } = data;
        
        if (!token || !user) {
          throw new Error('Invalid response from server: missing token or user data');
        }

        // Create user data object with email from form
        const userData = {
          id: user.id,
          name: user.name,
          email: formData.email,
          role: user.role
        };

        login(userData, token);
        navigate('/');
      } else {
        // Successfully signed up - switch to sign in form
        setIsSignIn(true);
        setError('Account created successfully! Please sign in.');
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
console.error(err);
      console.error('Auth error:', err);
      setError(err.message || 'Network error. Please check your connection and try again.');
      
      // More specific error messages
      if (err.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Please check if the backend is running on localhost:5000');
      } else if (err.message.includes('Network error')) {
        setError('Network error. Please check your internet connection.');
      } else if (err.message.includes('CORS')) {
        setError('CORS error. Please check backend CORS configuration.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  // Test connection function
  const testConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://enkwil-foundation.onrender.com/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@test.com', password: 'test' }),
      });
      console.log('Connection test response status:', response.status);
      console.log('Connection test headers:', response.headers);
      
      if (response.status === 400 || response.status === 401) {
        setError('Backend is reachable! (Got expected auth error)');
      } else {
        setError(`Backend responded with status: ${response.status}`);
      }
    } catch (err) {
console.error(err);
      setError(`Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4">
      {/* Background Animated Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)",
          backgroundSize: "200% 200%",
          animation: "gradient-move 3s ease infinite alternate",
        }}
      ></div>
      
      {/* Background Floating Icons */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const Icon = floatingIcons[Math.floor(Math.random() * floatingIcons.length)];
          const size = Math.random() * 20 + 20;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = Math.random() * 20 + 20;
          const delay = Math.random() * 10;
          const rotate = Math.random() * 360;
          const color = iconColors[Math.floor(Math.random() * iconColors.length)];
          return (
            <div
              key={i}
              className={`absolute floating-icon opacity-30 ${color}`}
              style={{
                top: `${top}vh`,
                left: `${left}vw`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: `rotate(${rotate}deg)`,
              }}
            >
              <Icon size={size} />
            </div>
          );
        })}
      </div>
      
      <div className="absolute inset-0 z-15 pattern-dots"></div>

      <div className="relative z-20 max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl animate-fade-in auth-card mt-20 mb-20">
        

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] rounded-full text-white shadow-md">
              <BookOpen className="h-10 w-10" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-charcoal mb-2">
            {isSignIn ? 'Welcome Back!' : 'Join Our Community'}
          </h2>
          <p className="text-deep-grey">
            {isSignIn
              ? 'Sign in to access your dashboard'
              : 'Create your student account to get started'}
          </p>
        </div>

        {/* Error/Success Message */}
        {error && (
          <div
            className={`px-4 py-3 rounded-lg relative mb-4 animate-fade-in ${
              error.includes('successfully') || error.includes('reachable')
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
          {!isSignIn && (
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required={!isSignIn}
              />
              <User className="input-icon" />
            </div>
          )}
          
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
            <Mail className="input-icon" />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              required
              minLength={6}
            />
            <Lock className="input-icon" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-grey hover:text-charcoal transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
              loading
                ? 'bg-navy opacity-70 cursor-not-allowed'
                : 'bg-navy hover:bg-accent shadow-custom'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isSignIn ? 'Signing In...' : 'Creating Account...'}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {isSignIn ? (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </div>
            )}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleForm}
            className="text-sm text-navy hover:text-accent transition-colors font-medium"
          >
            {isSignIn
              ? "Don't have an account? Sign up here"
              : 'Already have an account? Sign in here'}
          </button>
        </div>
      </div>

      <style jsx>{`
        :root {
          --charcoal: #1f2937;
          --navy: #1e3a8a;
          --gold: #f59e0b;
        }

        @keyframes gradient-move {
          0%, 100% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 50% 100%;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-and-float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(10vw, -10vh) rotate(45deg) scale(1.1);
          }
          50% {
            transform: translate(-10vw, 15vh) rotate(-45deg) scale(0.9);
          }
          75% {
            transform: translate(15vw, -5vh) rotate(30deg) scale(1.05);
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .floating-icon {
          animation: bounce-and-float infinite cubic-bezier(0.42, 0, 0.58, 1);
        }

        .input-field {
          width: 100%;
          padding: 1rem 1rem 1rem 2.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          background-color: #f9fafb;
          color: #1f2937;
          transition: all 0.3s ease-in-out;
          font-weight: 500;
        }
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }
        .shadow-custom {
          box-shadow: 0 10px 15px -3px rgba(30, 58, 138, 0.1), 0 4px 6px -2px rgba(30, 58, 138, 0.05);
        }
        .bg-navy {
          background-color: var(--navy);
        }
        .bg-accent {
          background-color: #f59e0b;
        }
        .text-charcoal {
          color: #1f2937;
        }
        .text-deep-grey {
          color: #4b5563;
        }
        .text-navy {
          color: var(--navy);
        }
      `}</style>
    </div>
  );
};

export default AuthPage;