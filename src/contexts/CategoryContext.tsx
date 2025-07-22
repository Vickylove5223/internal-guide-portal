
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDefaultCategories } from '@/components/ManageCategoriesModal';

export interface Category {
  id: number;
  name: string;
  contentCount: number;
  slug: string;
}

interface CategoryContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  updateCategoryPostCounts: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used within a CategoryProvider');
  return context;
};

// Function to calculate post counts for categories
const calculatePostCounts = (categories: Category[]): Category[] => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]');
  
  return categories.map(category => {
    const postCount = posts.filter((post: any) => {
      // Match by category name or slug
      return post.category === category.name || 
             post.category === category.slug ||
             (post.category && post.category.toLowerCase().replace(/\s+/g, '-') === category.name.toLowerCase().replace(/\s+/g, '-'));
    }).length;
    
    return {
      ...category,
      contentCount: postCount
    };
  });
};

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Load categories from localStorage or use defaults
  const [categories, setCategoriesState] = useState<Category[]>(() => {
    const stored = localStorage.getItem('categories');
    const initialCategories = stored ? JSON.parse(stored) : getDefaultCategories();
    return calculatePostCounts(initialCategories);
  });

  // Update categories with post counts
  const updateCategoryPostCounts = () => {
    setCategoriesState(prevCategories => calculatePostCounts(prevCategories));
  };

  // Custom setCategories that also saves to localStorage
  const setCategories = (newCategories: Category[] | ((prev: Category[]) => Category[])) => {
    setCategoriesState(prevCategories => {
      const updatedCategories = typeof newCategories === 'function' 
        ? newCategories(prevCategories) 
        : newCategories;
      
      const categoriesWithCounts = calculatePostCounts(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(categoriesWithCounts));
      return categoriesWithCounts;
    });
  };

  // Listen for storage changes to update post counts
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'posts') {
        updateCategoryPostCounts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update post counts when component mounts and posts change
  useEffect(() => {
    const interval = setInterval(() => {
      updateCategoryPostCounts();
    }, 1000); // Check every second for post changes

    return () => clearInterval(interval);
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories, updateCategoryPostCounts }}>
      {children}
    </CategoryContext.Provider>
  );
}; 
