import React from "react";
import { getCategoryConfig } from "../../utils/categoryUtils.js";
import {
  CategoryBadge,
  CategoryIcon,
  CategoryText,
} from "./StyledCategory.jsx";

const Category = ({
  category = "personal",
  size = "medium",
  variant = "default",
  showIcon = true,
  showText = true,
  className,
  ...props
}) => {
  const config = getCategoryConfig(category);

  return (
    <CategoryBadge
      $size={size}
      $variant={variant}
      $backgroundColor={config.bgColor}
      $textColor={config.color}
      $borderColor={config.borderColor}
      className={className}
      title={`Category: ${config.label}`}
      {...props}
    >
      {showIcon && variant !== "minimal" && (
        <CategoryIcon $size={size}>{config.icon}</CategoryIcon>
      )}
      {showText && (
        <CategoryText $showIcon={showIcon && variant !== "minimal"}>
          {config.label}
        </CategoryText>
      )}
    </CategoryBadge>
  );
};

export default Category;
