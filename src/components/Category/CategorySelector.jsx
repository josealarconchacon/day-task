import React from "react";
import { getCategoryOptions } from "../../utils/categoryUtils.js";
import { CategorySelectorStyled, CategoryOption } from "./StyledCategory.jsx";

const CategorySelector = ({
  value = "personal",
  onChange,
  id,
  required = false,
  disabled = false,
  className,
  ...props
}) => {
  const categoryOptions = getCategoryOptions();

  return (
    <CategorySelectorStyled
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={className}
      {...props}
    >
      {categoryOptions.map((option) => (
        <CategoryOption key={option.value} value={option.value}>
          {option.icon} {option.label}
        </CategoryOption>
      ))}
    </CategorySelectorStyled>
  );
};

export default CategorySelector;
