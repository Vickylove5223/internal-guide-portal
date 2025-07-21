import React, { createContext, useContext, useState } from 'react';
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
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used within a CategoryProvider');
  return context;
};

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(getDefaultCategories());
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}; 