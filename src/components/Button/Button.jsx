import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: #6c5ce7;
    color: white;
    
    &:hover {
      background-color: #5d4ec3;
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background-color: #dfe6e9;
    color: #2d3436;
    
    &:hover {
      background-color: #b2bec3;
    }
  `}
  
  ${(props) =>
    props.variant === "danger" &&
    `
    background-color: #d63031;
    color: white;
    
    &:hover {
      background-color: #b71c1c;
    }
  `}
  
  ${(props) =>
    props.size === "small" &&
    `
    padding: 5px 10px;
    font-size: 12px;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({ children, variant = "primary", size, ...props }) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
