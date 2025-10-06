import styled from "styled-components";

export const Form = styled.form`
  margin-bottom: 0;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NotesLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #667eea;
  margin-bottom: 4px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 12px;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #1a202c;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #718096;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  visibility: hidden;
`;

export const NotesTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.4;
  resize: vertical;
  min-height: 60px;
  max-height: 120px;
  background: #f8fafc;
  color: #1a202c;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    background: #f1f5f9;
  }

  &::placeholder {
    color: #718096;
    font-style: italic;
  }

  @media (prefers-contrast: high) {
    border-width: 2px;
  }
`;
