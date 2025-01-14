import React, { ReactNode, useEffect } from "react";
import { useCategory } from "../hooks/useCategory";
import CategoryContext from "./CategoryContext";

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const {
    categories,
    loading,
    error,
    success,
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategory();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        success,
        getAllCategories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
