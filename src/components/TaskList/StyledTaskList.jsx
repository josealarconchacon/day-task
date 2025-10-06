import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #f1f3f4;
  color: #9aa0a6;

  h3 {
    color: #5f6368;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 1.4;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 8px;
    margin-bottom: 15px;
  }
`;

export const FilterButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${(props) => (props.$active ? "#667eea" : "#e2e8f0")};
  border-radius: 20px;
  background-color: ${(props) => (props.$active ? "#667eea" : "white")};
  color: ${(props) => (props.$active ? "white" : "#4a5568")};
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.$active ? "#5a67d8" : "#f7fafc")};
    border-color: ${(props) => (props.$active ? "#5a67d8" : "#667eea")};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.15s ease, border-color 0.15s ease;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 12px;
  }
`;

export const SortContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e0;
  }
`;

export const SortLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #667eea;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid #e2e8f0;
    background-color: white;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    appearance: none;
    position: relative;

    &:checked {
      background-color: #667eea;
      border-color: #667eea;
    }

    &:checked::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    &:hover {
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
    }

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }
  }
`;
