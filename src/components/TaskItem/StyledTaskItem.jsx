import styled from "styled-components";

export const TaskContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 16px 0;
  background: transparent;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  gap: 0;

  &:hover {
    background-color: #fafbfc;
    border-bottom-color: #e1e5e9;
  }

  &:focus-within {
    background-color: #f8f9ff;
    border-bottom-color: #6c5ce7;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s ease;
  }
`;

export const Checkbox = styled.input`
  margin-right: 16px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #d1d5db;
  background-color: white;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  appearance: none;

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

  @media (prefers-contrast: high) {
    border-width: 3px;
  }
`;

export const TaskDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

export const TaskContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const EditNotesSection = styled.div`
  margin-top: 12px;
`;

export const TaskText = styled.span`
  flex: 1;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#b2bec3" : "#2d3436")};
`;

export const EditSection = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
  }
`;
