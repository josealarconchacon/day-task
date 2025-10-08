import React, { useState, useEffect } from "react";
import { TaskProvider } from "./context/TaskContext.jsx";
import {
  TaskListContent,
  useTaskListData,
} from "./components/TaskList/TaskList";
import Sidebar from "./components/Sidebar/Sidebar";
import TaskForm from "./components/TaskForm/TaskForm";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { TIMEOUTS } from "./constants/index.js";
import {
  GlobalStyle,
  AppContainer,
  AppLayout,
  ContentArea,
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
            <ErrorBoundary>
              <TaskListLayout />
            </ErrorBoundary>
          </MainContent>
        </AppContainer>
      </TaskProvider>
    </ErrorBoundary>
  );
};

// handles the layout with sidebar and content
const TaskListLayout = () => {
  const taskListData = useTaskListData();

  return (
    <AppLayout>
      <ErrorBoundary>
        <Sidebar
          filter={taskListData.filter}
          priorityFilter={taskListData.priorityFilter}
          categoryFilter={taskListData.categoryFilter}
          categoryOptions={taskListData.categoryOptions}
          taskCounts={taskListData.taskCounts}
          tasks={taskListData.tasks}
          sortByPriority={taskListData.sortByPriority}
          onFilterChange={taskListData.handleFilterChange}
          onPriorityFilterChange={taskListData.handlePriorityFilterChange}
          onCategoryFilterChange={taskListData.handleCategoryFilterChange}
          onSortToggle={taskListData.handleSortToggle}
        />
      </ErrorBoundary>
      <ContentArea>
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
          <TaskListContent
            tasks={taskListData.tasks}
            isLoading={taskListData.isLoading}
            saveError={taskListData.saveError}
            filter={taskListData.filter}
            priorityFilter={taskListData.priorityFilter}
            categoryFilter={taskListData.categoryFilter}
            filteredTasks={taskListData.filteredTasks}
            handlePriorityFilterChange={taskListData.handlePriorityFilterChange}
            handleCategoryFilterChange={taskListData.handleCategoryFilterChange}
          />
        </ErrorBoundary>
      </ContentArea>
    </AppLayout>
  );
};

export default App;
