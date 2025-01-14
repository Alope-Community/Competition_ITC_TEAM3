import { createContext, useContext } from "react";
import { Category } from "../models/Service"; // Asumsikan fungsi useCategory ada di file hooks

interface CategoryContextProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  success: string | null;
  getAllCategories: () => void;
  addCategory: (name: string) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategoryContext = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export default CategoryContext;
