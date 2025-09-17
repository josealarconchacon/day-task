import styled from "styled-components";

export const PriorityContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const PriorityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => {
    if (props.$variant === "dot") {
      switch (props.$size) {
        case "small":
          return "0";
        case "large":
          return "0";
        default:
          return "0";
      }
    }
    switch (props.$size) {
      case "small":
        return "2px 6px";
      case "large":
        return "6px 12px";
      default:
        return "3px 8px";
    }
  }};
  font-size: ${(props) => {
    switch (props.$size) {
      case "small":
        return "10px";
      case "large":
        return "13px";
      default:
        return "11px";
    }
  }};
  font-weight: ${(props) => (props.$variant === "minimal" ? "500" : "600")};
  color: ${(props) => props.$textColor};
  background-color: ${(props) => props.$backgroundColor};
  border: ${(props) => {
    if (props.$variant === "dot") return "none";
    if (props.$variant === "minimal") return `1px solid ${props.$borderColor}`;
    return `1px solid ${props.$borderColor}`;
  }};
  border-radius: ${(props) => {
    if (props.$variant === "dot") {
      switch (props.$size) {
        case "small":
          return "50%";
        case "large":
          return "50%";
        default:
          return "50%";
      }
    }
    if (props.$variant === "minimal") return "6px";
    return "6px";
  }};
  width: ${(props) => {
    if (props.$variant === "dot") {
      switch (props.$size) {
        case "small":
          return "8px";
        case "large":
          return "12px";
        default:
          return "10px";
      }
    }
    return "auto";
  }};
  height: ${(props) => {
    if (props.$variant === "dot") {
      switch (props.$size) {
        case "small":
          return "8px";
        case "large":
          return "12px";
        default:
          return "10px";
      }
    }
    return "auto";
  }};
  text-transform: ${(props) =>
    props.$variant === "minimal" ? "none" : "uppercase"};
  letter-spacing: ${(props) => (props.$variant === "minimal" ? "0" : "0.3px")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  user-select: none;

  &:hover {
    opacity: ${(props) => (props.$variant === "dot" ? "0.8" : "1")};
    transform: ${(props) => (props.$variant === "dot" ? "scale(1.1)" : "none")};
  }

  @media (prefers-contrast: high) {
    border-width: 2px;
    font-weight: 700;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.2s ease;

    &:hover {
      transform: none;
    }
  }
`;

export const PriorityIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: ${(props) => {
    switch (props.$size) {
      case "small":
        return "10px";
      case "large":
        return "14px";
      default:
        return "12px";
    }
  }};
  line-height: 1;
`;

export const PriorityText = styled.span`
  font-size: inherit;
  font-weight: inherit;
  line-height: 1;
  margin-left: ${(props) => (props.$showIcon ? "0" : "0")};
`;

export const PrioritySelector = styled.select`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  min-width: 100px;
  color: #495057;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23495057' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
  padding-right: 40px;

  &:focus {
    outline: none;
    background-color: #e9ecef;
  }

  &:hover:not(:focus) {
    background-color: #e9ecef;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.15s ease;
  }
`;

export const PriorityOption = styled.option`
  padding: 12px 16px;
  font-weight: 500;
  background-color: white;
  color: #2d3436;

  &:checked {
    background-color: #6c5ce7;
    color: white;
  }
`;
