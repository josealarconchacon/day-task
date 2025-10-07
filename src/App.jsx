import React, { useState, useEffect } from "react";
import { TaskProvider } from "./context/TaskContext.jsx";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { TIMEOUTS } from "./constants/index.js";
import {
  GlobalStyle,
  AppContainer,
  Header,
  MainContent,
} from "./styles/GlobalStyles";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMainApp, setShowMainApp] = useState(false);

  // show welcome screen for specified duration, then automatically proceed
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetStarted();
    }, TIMEOUTS.WELCOME_SCREEN_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setShowMainApp(true);
    }, TIMEOUTS.TRANSITION_DELAY);
  };

  if (showWelcome) {
    return (
      <>
        <GlobalStyle />
        <WelcomeScreen onGetStarted={handleGetStarted} />
      </>
    );
  }

  return (
    <ErrorBoundary>
      <TaskProvider>
        <GlobalStyle />
        <AppContainer>
          <MainContent $isVisible={showMainApp}>
            <Header>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  padding: "24px 32px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 40px rgba(0, 0, 0, 0.08)",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #007AFF,rgb(116, 115, 174))",
                      boxShadow: "0 2px 8px rgba(0, 28, 58, 0.3)",
                    }}
                  ></div>
                  <div>
                    <h1
                      style={{
                        margin: "0",
                        fontSize: "1.75rem",
                        fontWeight: "600",
                        color: "#1d1d1f",
                        letterSpacing: "-0.02em",
                        lineHeight: "1.2",
                      }}
                    >
                      DayLily
                    </h1>
                    <p
                      style={{
                        margin: "0",
                        color: "#86868b",
                        fontSize: "0.85rem",
                        fontWeight: "400",
                        lineHeight: "1.3",
                      }}
                    >
                      Focus on what matters today
                    </p>
                  </div>
                </div>
              </div>
            </Header>
            <ErrorBoundary>
              <TaskForm />
            </ErrorBoundary>
            <ErrorBoundary>
              <TaskList />
            </ErrorBoundary>
          </MainContent>
        </AppContainer>
      </TaskProvider>
    </ErrorBoundary>
  );
};

export default App;
