import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      // Verify token with API
      authService.verifyToken(token).then(result => {
        if (result.success) {
          setUser(JSON.parse(storedUser));
        } else {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const sendOtp = async (email) => {
    setError(null);
    setLoading(true);
    
    const result = await authService.sendOtp(email);
    
    setLoading(false);
    return result;
  };

  const verifyOtp = async (email, userOtp, hashOTP) => {
    setError(null);
    setLoading(true);
    
    const result = await authService.verifyOtp(email, userOtp, hashOTP);
    
    setLoading(false);
    return result;
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    
    const result = await authService.login(email, password);
    
    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      setError(null);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  const register = async (userData, hashOTP, userOtp) => {
    setError(null);
    
    // Check if email contains @inspironlabs.com
    if (!userData.email.includes('@inspironlabs.com')) {
      return { 
        success: false, 
        message: 'Registration is only available for @inspironlabs.com email addresses' 
      };
    }
    
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      return { 
        success: false, 
        message: 'Passwords do not match' 
      };
    }
    
    // Validate password length
    if (userData.password.length < 6) {
      return { 
        success: false, 
        message: 'Password must be at least 6 characters' 
      };
    }
    
    // Validate username
    if (userData.username.length < 3) {
      return { 
        success: false, 
        message: 'Username must be at least 3 characters' 
      };
    }
    
    setLoading(true);
    
    const result = await authService.register(userData, hashOTP, userOtp);
    
    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      setError(null);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  const logout = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      authService.logout(token);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    sendOtp,
    verifyOtp,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};