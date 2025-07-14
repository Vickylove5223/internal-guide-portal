
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  setNewPassword: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      console.log('Login attempt:', { email, password });
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Ifeoluwa',
        lastName: 'Adeyemi'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      console.log('Password reset request for:', email);
      // Simulate sending reset email
      return true;
    } catch (error) {
      console.error('Password reset failed:', error);
      return false;
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      console.log('OTP verification:', otp);
      // Simulate OTP verification
      return otp === '123456';
    } catch (error) {
      console.error('OTP verification failed:', error);
      return false;
    }
  };

  const setNewPassword = async (password: string): Promise<boolean> => {
    try {
      console.log('Setting new password');
      // Simulate password update
      return true;
    } catch (error) {
      console.error('Set new password failed:', error);
      return false;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    resetPassword,
    verifyOTP,
    setNewPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
