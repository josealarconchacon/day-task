import styled from "styled-components";
import {
  COLORS,
  FONT_SIZES,
  BORDER_RADIUS,
  SPACING,
} from "../../styles/designTokens.js";

export const Form = styled.form`
  margin-bottom: 30px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const InlineNotesContainer = styled.div`
  background: white;
  border-radius: 0 0 ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg};
  border: 1px solid #f0f0f0;
  border-top: none;
  padding: 8px 12px 12px 12px;
  margin-top: -1px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileNotesContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: white;
    border-radius: 0;
    border: 1px solid #f0f0f0;
    border-top: none;
    border-bottom: none;
    padding: 8px 12px 12px 12px;
    margin-top: -1px;
  }
`;

export const NotesLabel = styled.label`
  font-size: ${FONT_SIZES.lg};
  font-weight: 500;
  color: #6c5ce7;
  margin-bottom: 4px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg} 0 0;
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  border-bottom: none;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 12px;
    border-radius: ${BORDER_RADIUS.lg};
    border-bottom: 1px solid #f0f0f0;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 6px;
  }
`;

export const DesktopFormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg} 0 0;
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  border-bottom: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileFormContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

export const MobileInputRow = styled.div`
  background: white;
  border-radius: ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg} 0 0;
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  border-bottom: none;
`;

export const MobileControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 0 0 ${BORDER_RADIUS.lg} ${BORDER_RADIUS.lg};
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  border-top: none;
  margin-top: -1px;

  @media (max-width: 480px) {
    gap: 12px;
    padding: 6px;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #2d3436;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #a0a6b1;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: ${FONT_SIZES.lg};
  font-weight: 500;
  color: #333;
  visibility: hidden;
`;

export const NotesTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  font-size: ${FONT_SIZES.lg};
  font-family: inherit;
  line-height: 1.4;
  resize: vertical;
  min-height: 60px;
  max-height: 120px;
  background: #fafbfc;
  color: #2d3436;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
    background: white;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  }

  &:hover {
    background: #fafbfc;
  }

  &::placeholder {
    color: #a0a6b1;
    font-style: italic;
  }

  @media (prefers-contrast: high) {
    border-width: 2px;
  }
`;
