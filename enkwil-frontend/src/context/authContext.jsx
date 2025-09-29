import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * AuthContext is created with an undefined default value.
 * The consumer (useAuth) will check for this undefined value to ensure it's
 * used within the provider.
 */
const AuthContext = createContext(undefined);

/**
 * useAuth Hook
 * Provides access to the authentication context (user, token, login, logout, loading).
 * @returns {object} The authentication context value.
 * @throws {Error} if used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This runtime check replaces the TypeScript check
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider Component
 * Manages the global authentication state (user, token, loading) and persistence
 * using localStorage.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to wrap.
 */
export const AuthProvider = ({ children }) => {
  // State for user data, authentication token, and loading status
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect to load stored credentials from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        // Attempt to safely parse the stored user data
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data. Clearing storage.", error);
        // Clear corrupt storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    // Set loading to false once initial check is complete
    setLoading(false);
  }, []);

  /**
   * Logs a user in, setting the state and persisting data to localStorage.
   * @param {object} userData - The user object (e.g., {id, name, role}).
   * @param {string} authToken - The JWT or session token.
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    // Persist to web storage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Logs a user out, clearing the state and removing data from localStorage.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    // Clear web storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // The value exposed by the context provider
  const value = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* Optionally render a loading screen here while loading is true */}
    </AuthContext.Provider>
  );
};

// Export AuthProvider as the default component for convenience
export default AuthProvider;
