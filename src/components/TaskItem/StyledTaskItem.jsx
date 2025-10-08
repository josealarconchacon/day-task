import styled from "styled-components";

export const TaskContainer = styled.li`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 12px;
  position: relative;
  border: 1px solid #e8eaed;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    margin-bottom: 10px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    margin-bottom: 8px;
    border-radius: 8px;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px 16px 24px;
  min-height: 60px;

  @media (max-width: 768px) {
    padding: 16px 20px 12px 20px;
    gap: 12px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 12px 16px 8px 16px;
    gap: 10px;
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #dadce0;
  background-color: #ffffff;
  position: relative;
  appearance: none;
  flex-shrink: 0;
  margin-top: 1px;

  &:checked {
    background-color: #1a73e8;
    border-color: #1a73e8;
  }

  &:checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
  }

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }

  @media (prefers-contrast: high) {
    border-width: 3px;
  }
`;

export const TaskDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const EditNotesSection = styled.div`
  padding: 16px 24px 8px 24px;
  background: #f8f9fa;
  border-top: 1px solid #f1f3f4;
  margin: 0 -1px -1px -1px;
  border-radius: 0 0 12px 12px;

  @media (max-width: 768px) {
    padding: 12px 20px 6px 20px;
    border-radius: 0 0 10px 10px;
  }

  @media (max-width: 480px) {
    padding: 10px 16px 6px 16px;
    border-radius: 0 0 8px 8px;
  }
`;

export const TaskText = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
  color: ${(props) => (props.$completed ? "#9aa0a6" : "#3c4043")};
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  word-break: break-word;
  min-width: 0;
  letter-spacing: -0.01em;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.4;
    gap: 6px;
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
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 4px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    align-items: flex-start;
  }
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 20px 8px 20px;
  background: transparent;
  border-top: none;
  margin: 0;
  border-radius: 0;
  opacity: 0;
  transition: opacity 0.2s ease;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px 16px 6px 16px;
    justify-content: flex-start;
    /* Always show on mobile for better UX */
    opacity: 1;
  }
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  min-width: 0;
  background: white;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #1a73e8;
    box-shadow: 0 0 0 1px rgba(26, 115, 232, 0.1);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;
