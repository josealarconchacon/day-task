import React, { useState, useEffect } from "react";
import { TaskProvider } from "./context/TaskContext.jsx";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
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

  // show welcome screen for 3 seconds, then automatically proceed
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetStarted();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setShowMainApp(true);
    }, 100);
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
    <TaskProvider>
      <GlobalStyle />
      <AppContainer>
        <MainContent $isVisible={showMainApp}>
          <Header>
            <Title>Day Task</Title>
            <p>Manage your daily task</p>
          </Header>
          <TaskForm />
          <TaskList />
        </MainContent>
      </AppContainer>
    </TaskProvider>
  );
};

export default App;
