import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background-color: #6c5ce7;
    color: white;
    &:hover {
      background-color: #5d4ec3;
    }
  `,
  secondary: css`
    background-color: #dfe6e9;
    color: #2d3436;
    &:hover {
      background-color: #b2bec3;
    }
  `,
  danger: css`
    background-color: #d63031;
    color: white;
    &:hover {
      background-color: #b71c1c;
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: 5px 10px;
    font-size: 12px;
  `,
};

export const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  ${(props) => variantStyles[props.$variant || "primary"]}
  ${(props) => sizeStyles[props.$size]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
