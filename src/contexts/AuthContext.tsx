
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SafeStorage } from '@/utils/storage';
import { logger } from '@/utils/logger';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  avatar?: string;
  name?: string;
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
    try {
      const storedUser = SafeStorage.get<User | null>('user', null);
      if (storedUser) {
        setUser(storedUser);
        logger.info('User session restored', { userId: storedUser.id });
      }
    } catch (error) {
      logger.error('Failed to restore user session', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      logger.info('Login attempt started', { email });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login - in production, this would be a real API call
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Ifeoluwa',
        lastName: 'Adeyemi',
        name: 'Ifeoluwa Adeyemi',
        role: 'admin'
      };
      
      setUser(mockUser);
      const saved = SafeStorage.set('user', mockUser);
      
      if (!saved) {
        logger.error('Failed to save user to storage');
        return false;
      }
      
      logger.info('Login successful', { userId: mockUser.id });
      return true;
    } catch (error) {
      logger.error('Login failed', { email, error });
      return false;
    }
  };

  const logout = () => {
    try {
      logger.info('Logout initiated', { userId: user?.id });
      setUser(null);
      SafeStorage.remove('user');
      logger.info('Logout successful');
    } catch (error) {
      logger.error('Logout failed', error);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      logger.info('Password reset requested', { email });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      logger.info('Password reset email sent', { email });
      return true;
    } catch (error) {
      logger.error('Password reset failed', { email, error });
      return false;
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      logger.info('OTP verification attempted');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const isValid = otp === '123456';
      
      if (isValid) {
        logger.info('OTP verification successful');
      } else {
        logger.warn('OTP verification failed - invalid code');
      }
      
      return isValid;
    } catch (error) {
      logger.error('OTP verification failed', error);
      return false;
    }
  };

  const setNewPassword = async (password: string): Promise<boolean> => {
    try {
      logger.info('New password set attempt');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      logger.info('New password set successfully');
      return true;
    } catch (error) {
      logger.error('Set new password failed', error);
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
