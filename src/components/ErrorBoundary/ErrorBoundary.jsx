import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 20px;
`;

const ErrorTitle = styled.h2`
  color: #dc2626;
  margin-bottom: 16px;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: #7f1d1d;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin-top: 16px;
  padding: 16px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 4px;
  text-align: left;
  max-width: 100%;
  overflow: auto;
`;

const ErrorSummary = styled.summary`
  cursor: pointer;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 8px;
`;

const ErrorStack = styled.pre`
  font-size: 12px;
  color: #7f1d1d;
  white-space: pre-wrap;
  word-break: break-word;
`;

const RefreshButton = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b91c1c;
  }

  &:active {
    background-color: #991b1b;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRefresh = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer role="alert">
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. Your tasks are
            safely stored and will be available when you refresh the page.
          </ErrorMessage>

          <RefreshButton onClick={this.handleRefresh}>
            Refresh Page
          </RefreshButton>

          {this.state.error && import.meta.env?.DEV && (
            <ErrorDetails>
              <ErrorSummary>Error Details (Development Mode)</ErrorSummary>
              <div>
                <strong>Error:</strong> {this.state.error.toString()}
              </div>
              {this.state.errorInfo && (
                <ErrorStack>
                  <strong>Component Stack:</strong>
                  {this.state.errorInfo.componentStack}
                </ErrorStack>
              )}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
