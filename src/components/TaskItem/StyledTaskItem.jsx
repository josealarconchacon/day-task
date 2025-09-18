import styled from "styled-components";

export const TaskContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid #f1f3f4;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #e8eaed;
    transform: translateY(-1px);
  }

  &:focus-within {
    box-shadow: 0 4px 12px rgba(108, 92, 231, 0.15);
    border-color: #6c5ce7;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: none;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 8px;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid #d1d5db;
  background-color: white;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  appearance: none;
  flex-shrink: 0;
  margin-top: 2px;

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
  gap: 8px;
`;

export const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const TaskMainContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
`;

export const EditNotesSection = styled.div`
  margin-top: 12px;
`;

export const TaskText = styled.span`
  flex: 1;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#9aa0a6" : "#202124")};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  word-break: break-word;
  margin-right: 8px;
  min-width: 0; /* Allow text to shrink */

  @media (max-width: 768px) {
    font-size: 15px;
    margin-right: 6px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 4px;
    line-height: 1.3;
  }
`;

export const EditSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

export const EditInputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    align-items: flex-start;
  }
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f1f3f4;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;
  }
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 16px;
  min-width: 0;
  background: white;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: #6c5ce7;
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
  }

  &:hover:not(:focus) {
    border-color: #5f6368;
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 16px; 
  }
`;
