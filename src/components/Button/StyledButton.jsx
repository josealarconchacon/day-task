import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #0056cc 0%, #4a4ac4 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    }
  `,
  secondary: css`
    background: rgba(255, 255, 255, 0.9);
    color: #374151;
    border: 1px solid rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 1);
      border-color: rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `,
  danger: css`
    background: linear-gradient(135deg, #ff3b30 0%, #ff6b6b 100%);
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(255, 59, 48, 0.2);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #e6342a 0%, #ff5252 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: 10px 18px;
    font-size: 13px;
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: 0.01em;
  `,
};

export const StyledButton = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  outline: none;
  position: relative;
  overflow: hidden;

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
