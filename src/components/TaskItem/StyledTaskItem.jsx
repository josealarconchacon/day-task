import styled from "styled-components";

export const TaskContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Checkbox = styled.input`
  margin-right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const TaskText = styled.span`
  flex: 1;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#b2bec3" : "#2d3436")};
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;
