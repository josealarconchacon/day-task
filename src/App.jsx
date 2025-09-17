import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import {
  GlobalStyle,
  AppContainer,
  Header,
  Title,
} from "./styles/GlobalStyles";

const App = () => {
  return (
    <TaskProvider>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>Day Task</Title>
          <p>Manage your daily task</p>
        </Header>
      </AppContainer>
    </TaskProvider>
  );
};

export default App;
