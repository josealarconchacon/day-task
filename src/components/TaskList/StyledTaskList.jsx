import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
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
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? "#6c5ce7" : "#dfe6e9")};
  color: ${(props) => (props.$active ? "white" : "#2d3436")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$active ? "#5d4ec3" : "#b2bec3")};
  }
`;
