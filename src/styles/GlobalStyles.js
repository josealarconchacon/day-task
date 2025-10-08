import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(226, 226, 226) 100%);
    background-attachment: fixed;
    min-height: 100vh;
    color: #1d1d1f;
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .task-item:hover .task-actions {
    opacity: 1 !important;
  }

  .inline-actions {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .task-item:hover .inline-actions {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .inline-actions {
      opacity: 1;
    }
  }
`;

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const Header = styled.header`
  margin-bottom: 32px;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

export const MainContent = styled.div`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 0.5s ease, transform 0.5s ease;
`;
