import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background-color: #6c5ce7;
    color: white;
    border: 1px solid #6c5ce7;
    &:hover:not(:disabled) {
      background-color: #5d4ec3;
      border-color: #5d4ec3;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(108, 92, 231, 0.25);
    }
  `,
  secondary: css`
    background-color: white;
    color: #5f6368;
    border: 1px solid #dadce0;
    &:hover:not(:disabled) {
      background-color: #f8f9fa;
      border-color: #5f6368;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  danger: css`
    background-color: #ea4335;
    color: white;
    border: 1px solid #ea4335;
    &:hover:not(:disabled) {
      background-color: #d33b2c;
      border-color: #d33b2c;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(234, 67, 53, 0.25);
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 6px;
  `,
};

export const StyledButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  outline: none;

  ${(props) => variantStyles[props.$variant || "primary"]}
  ${(props) => sizeStyles[props.$size]}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f1f3f4 !important;
    color: #9aa0a6 !important;
    border-color: #f1f3f4 !important;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.15s ease, border-color 0.15s ease;

    &:hover:not(:disabled),
    &:active:not(:disabled) {
      transform: none;
      box-shadow: none;
    }
  }
`;
