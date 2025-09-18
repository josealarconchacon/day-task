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
  Title,
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
              <Title>Day Task</Title>
              <p>Manage your daily task</p>
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
