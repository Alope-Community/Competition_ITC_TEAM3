import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { useCategoryContext } from "../../../context/CategoryContext";

interface SelectCategoryProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const { categories, getAllCategories } = useCategoryContext();

  useEffect(() => {
    getAllCategories();
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    changeTextColor();
  };

  return (
    <div>
      <div className="relative z-2 dark:bg-form-input">
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
          <MdOutlineCategory className="dark:text-primarydark" />
        </span>

        <select
          value={value}
          onChange={(e) => {
            onChange(e);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Category
          </option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="text-body dark:text-bodydark"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectCategory;
