import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { User, LogOut, Settings, Menu, X, BookOpen } from 'lucide-react';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/find-tutor', label: 'Find Tutor' },
    { path: '/become-tutor', label: 'Become Tutor' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 shadow-xl border-b"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(229, 231, 235, 0.3)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
              style={{ color: '#374151' }}
            >
              <div className="relative">
                <BookOpen className="h-8 w-8" style={{ color: '#1E3A8A' }} />
                <div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: '#F59E0B' }}
                ></div>
              </div>
              <span 
                className="font-black text-2xl"
                style={{
                  background: 'linear-gradient(135deg, #1E3A8A, #06B6D4, #1E3A8A)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite'
                }}
              >
                Enkwil
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === link.path ? 'nav-link-active' : 'nav-link'
                }`}
                style={location.pathname === link.path ? {
                  backgroundColor: '#1E3A8A',
                  color: 'white',
                  boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.25)'
                } : {
                  color: '#374151'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== link.path) {
                    e.target.style.backgroundColor = '#F9FAFB';
                    e.target.style.color = '#1E3A8A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== link.path) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#374151';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div ref={profileMenuRef} className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl border transition-all duration-300 transform hover:scale-105 focus:outline-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(6, 182, 212, 0.05))',
                    borderColor: 'rgba(30, 58, 138, 0.2)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.1), rgba(6, 182, 212, 0.1))';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(6, 182, 212, 0.05))';
                  }}
                >
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #1E3A8A, #06B6D4)'
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </div>
                  <span style={{ color: '#374151' }} className="font-medium">
                    {user.name || user.email}
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div 
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border py-2 z-50"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      borderColor: 'rgba(229, 231, 235, 0.5)',
                      animation: 'slideInDown 0.3s ease-out'
                    }}
                  >
                    <div className="px-4 py-3 border-b" style={{ borderColor: '#F3F4F6' }}>
                      <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{user.name}</p>
                      <span 
                        className="text-xs px-2 py-1 rounded-full mt-1 inline-block"
                        style={{ 
                          backgroundColor: '#F3F4F6',
                          color: '#9CA3AF'
                        }}
                      >
                        {user.role}
                      </span>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-3 text-sm transition-colors duration-200"
                        style={{ color: '#374151' }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(30, 58, 138, 0.05)';
                          e.target.style.color = '#1E3A8A';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm transition-colors duration-200"
                      style={{ color: '#DC2626' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-white"
                style={{
                  background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)',
                  boxShadow: '0 10px 25px -5px rgba(30, 58, 138, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #1E40AF, #1E3A8A)';
                  e.target.style.boxShadow = '0 20px 40px -10px rgba(30, 58, 138, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #1E3A8A, #1E40AF)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(30, 58, 138, 0.25)';
                }}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl transition-all duration-300 focus:outline-none"
              style={{ color: '#374151' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1E3A8A';
                e.target.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#374151';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden absolute top-16 left-0 w-full border-b shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(229, 231, 235, 0.5)',
            animation: 'slideInDown 0.3s ease-out'
          }}
        >
          <div className="px-4 pt-4 pb-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  location.pathname === link.path ? 'mobile-link-active' : 'mobile-link'
                }`}
                style={location.pathname === link.path ? {
                  backgroundColor: '#1E3A8A',
                  color: 'white',
                  boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.25)'
                } : {
                  color: '#374151'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== link.path) {
                    e.target.style.backgroundColor = '#F9FAFB';
                    e.target.style.color = '#1E3A8A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== link.path) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#374151';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
            {user ? (
              <div className="space-y-3">
                <div 
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl"
                  style={{ backgroundColor: '#F9FAFB' }}
                >
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #1E3A8A, #06B6D4)'
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{user.name}</p>
                    <p className="text-xs capitalize" style={{ color: '#9CA3AF' }}>{user.role}</p>
                  </div>
                </div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-3 text-sm rounded-xl transition-colors duration-200"
                    style={{ color: '#374151' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm rounded-xl transition-colors duration-200"
                  style={{ color: '#DC2626' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 font-semibold rounded-xl transition-all duration-300 text-white"
                style={{
                  background: 'linear-gradient(135deg, #1E3A8A, #1E40AF)'
                }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;