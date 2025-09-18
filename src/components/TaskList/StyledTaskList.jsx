import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #b2bec3;
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
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? "#6c5ce7" : "#dfe6e9")};
  color: ${(props) => (props.$active ? "white" : "#2d3436")};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.$active ? "#5d4ec3" : "#b2bec3")};
  }

  @media (max-width: 600px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const SortContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f1f3f4;
    border-color: #d1d5db;
  }
`;

export const SortLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #6c5ce7;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid #d1d5db;
    background-color: white;
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    appearance: none;
    position: relative;

    &:checked {
      background-color: #6c5ce7;
      border-color: #6c5ce7;
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
      border-color: #6c5ce7;
      box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
    }

    &:focus {
      outline: none;
      border-color: #6c5ce7;
      box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
    }
  }
`;
