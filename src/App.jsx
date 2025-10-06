import React, { useState, useEffect } from "react";
import { TaskProvider } from "./context/TaskContext.jsx";
import Dashboard from "./components/Dashboard";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { TIMEOUTS } from "./constants/index.js";
import { GlobalStyle } from "./styles/GlobalStyles";

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
        {showMainApp && <Dashboard />}
      </TaskProvider>
    </ErrorBoundary>
  );
};

export default App;
