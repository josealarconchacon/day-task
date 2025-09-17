import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  margin-bottom: 30px;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
  }
`;
