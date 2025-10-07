import styled from "styled-components";

export const NotesContainer = styled.div`
  margin-top: ${(props) => (props.$minimal ? "4px" : "8px")};
`;

export const NotesToggle = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$compact ? "4px" : "6px")};
  background: none;
  border: none;
  padding: ${(props) => (props.$compact ? "2px 4px" : "4px 8px")};
  border-radius: ${(props) => (props.$compact ? "4px" : "6px")};
  cursor: pointer;
  font-size: ${(props) => (props.$compact ? "11px" : "13px")};
  color: ${(props) => (props.$hasNotes ? "#6c5ce7" : "#a0a6b1")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$compact ? "0.7" : "1")};

  &:hover {
    background-color: ${(props) => (props.$hasNotes ? "#f8f9ff" : "#f5f5f5")};
    color: ${(props) => (props.$hasNotes ? "#5a4fcf" : "#6c5ce7")};
    opacity: 1;
  }

  &:focus {
    outline: none;
    background-color: ${(props) => (props.$hasNotes ? "#f8f9ff" : "#f5f5f5")};
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s ease;
  }
`;

export const NotesIcon = styled.span`
  font-size: ${(props) => (props.$compact ? "12px" : "14px")};
  opacity: ${(props) => (props.$hasNotes ? 1 : 0.6)};
`;

export const NotesLabel = styled.span`
  font-weight: ${(props) => (props.$hasNotes ? "500" : "400")};
`;

export const NotesTextarea = styled.textarea`
  width: 100%;
  padding: ${(props) => (props.$minimal ? "8px 12px" : "12px")};
  border: ${(props) => (props.$minimal ? "none" : "1px solid #e1e5e9")};
  border-radius: ${(props) => (props.$minimal ? "0" : "8px")};
  font-size: ${(props) => (props.$minimal ? "13px" : "14px")};
  font-family: inherit;
  line-height: 1.4;
  resize: ${(props) => (props.$minimal ? "none" : "vertical")};
  min-height: ${(props) => (props.$minimal ? "32px" : "60px")};
  max-height: ${(props) => (props.$minimal ? "32px" : "120px")};
  background: ${(props) => (props.$minimal ? "transparent" : "#fafbfc")};
  color: #2d3436;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.$minimal ? "1" : "1")};

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$minimal ? "transparent" : "#6c5ce7")};
    background: ${(props) => (props.$minimal ? "transparent" : "white")};
    box-shadow: ${(props) =>
      props.$minimal ? "none" : "0 0 0 3px rgba(108, 92, 231, 0.1)"};
    opacity: 1;
  }

  &:hover {
    opacity: ${(props) => (props.$minimal ? "1" : "1")};
    background: ${(props) => (props.$minimal ? "transparent" : "#fafbfc")};
  }

  &::placeholder {
    color: #a0a6b1;
    font-style: ${(props) => (props.$minimal ? "normal" : "italic")};
    font-size: ${(props) => (props.$minimal ? "12px" : "14px")};
  }

  @media (prefers-contrast: high) {
    border-width: 2px;
  }
`;

export const NotesActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  justify-content: flex-end;
`;

export const NotesDisplay = styled.div`
  padding: ${(props) => (props.$compact ? "8px" : "12px")};
  background: #fafbfc;
  border: 1px solid #e1e5e9;
  border-radius: ${(props) => (props.$compact ? "6px" : "8px")};
  font-size: ${(props) => (props.$compact ? "12px" : "14px")};
  line-height: 1.4;
  color: #2d3436;
  white-space: pre-wrap;
  min-height: ${(props) => (props.$compact ? "32px" : "40px")};
`;
