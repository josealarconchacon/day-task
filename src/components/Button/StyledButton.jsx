import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background: #1a73e8;
    color: white;
    border: none;
  `,
  secondary: css`
    background: #ffffff;
    color: #5f6368;
    border: 1px solid #dadce0;
  `,
  danger: css`
    background: #ea4335;
    color: white;
    border: none;
  `,
};

const sizeStyles = {
  small: css`
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 4px;
    font-weight: 500;
    letter-spacing: 0.01em;
  `,
};

export const StyledButton = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  outline: none;
  position: relative;
  overflow: hidden;

  ${(props) => variantStyles[props.$variant || "primary"]}
  ${(props) => sizeStyles[props.$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f1f3f4 !important;
    color: #9aa0a6 !important;
    border-color: #f1f3f4 !important;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
`;
