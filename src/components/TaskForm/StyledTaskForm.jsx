import styled from "styled-components";

export const Form = styled.form`
  margin-bottom: 30px;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
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
  font-size: 14px;
  font-weight: 500;
  color: #333;
  visibility: hidden; /* Hidden for cleaner look */
`;
