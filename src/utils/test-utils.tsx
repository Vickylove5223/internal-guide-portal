
import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { CategoryProvider } from '@/contexts/CategoryContext';

// Create a test query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Test wrapper component
export const TestWrapper = ({ children }: { children: ReactElement }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CategoryProvider>
            {children}
          </CategoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Mock data generators
export const mockPost = (overrides = {}) => ({
  id: 1,
  title: 'Test Post',
  content: 'Test content',
  category: 'All Updates',
  status: 'Published',
  author: 'Test Author',
  createdAt: new Date().toISOString(),
  likes: 0,
  ...overrides,
});

export const mockEvent = (overrides = {}) => ({
  id: 1,
  title: 'Test Event',
  description: 'Test description',
  date: new Date().toISOString(),
  time: '10:00',
  location: 'Test Location',
  attendees: 0,
  ...overrides,
});

export const mockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  ...overrides,
});

// Test helpers
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLocalStorage = () => {
  const store: { [key: string]: string } = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(key => delete store[key]);
    },
  };
};
