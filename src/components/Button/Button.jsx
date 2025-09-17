import React from "react";
import { StyledButton } from "./StyledButton.jsx";

const Button = ({ children, variant = "primary", size, ...props }) => {
  return (
    <StyledButton $variant={variant} $size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
