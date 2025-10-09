import React, { useState, useEffect, useContext } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider, TaskContext } from "./context/TaskContext.jsx";
import { useAuth } from "./hooks/useAuth.js";
import {
  TaskListContent,
  useTaskListData,
} from "./components/TaskList/TaskList";
import Sidebar from "./components/Sidebar/Sidebar";
import TaskForm from "./components/TaskForm/TaskForm";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import AuthModal from "./components/AuthModal/AuthModal";
import UserMenu from "./components/UserMenu/UserMenu";
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
      <AuthProvider>
        <AuthenticatedApp showMainApp={showMainApp} />
      </AuthProvider>
    </ErrorBoundary>
  );
};

// Separate component to access auth context
const AuthenticatedApp = ({ showMainApp }) => {
  const { user, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              color: "#5d4ec3",
            }}
          >
            <div>Loading...</div>
          </div>
        </AppContainer>
      </>
    );
  }

  return (
    <TaskProvider user={user}>
      <GlobalStyle />
      <AppContainer>
        <MainContent $isVisible={showMainApp}>
          <ErrorBoundary>
            <TaskListLayout />
          </ErrorBoundary>
          <AuthModalContainer />
        </MainContent>
      </AppContainer>
    </TaskProvider>
  );
};

// Container for auth modal
const AuthModalContainer = () => {
  const taskContext = useContext(TaskContext);
  const { showAuthModal, closeAuthModal, handleAuthSuccess } = taskContext;

  return (
    <AuthModal
      isOpen={showAuthModal}
      onClose={closeAuthModal}
      onSuccess={handleAuthSuccess}
      mode="signup"
    />
  );
};

// handles the layout with sidebar and content
const TaskListLayout = () => {
  const taskListData = useTaskListData();
  const { user } = useAuth();
  const { anonymousTaskCount, isAuthenticated, openAuthModal } =
    useContext(TaskContext);

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
        <Header className="desktop-header">
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
                justifyContent: "space-between",
                gap: "12px",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {!isAuthenticated && (
                  <>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#86868b",
                        padding: "6px 12px",
                        background: "rgba(93, 78, 195, 0.1)",
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}
                    >
                      {anonymousTaskCount}/5 free tasks
                    </div>
                    <button
                      onClick={openAuthModal}
                      style={{
                        fontSize: "0.75rem",
                        color: "#5d4ec3",
                        padding: "6px 16px",
                        background: "white",
                        border: "1.5px solid rgba(93, 78, 195, 0.3)",
                        borderRadius: "8px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(93, 78, 195, 0.05)";
                        e.target.style.borderColor = "rgba(93, 78, 195, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                        e.target.style.borderColor = "rgba(93, 78, 195, 0.3)";
                      }}
                    >
                      Sign In
                    </button>
                  </>
                )}
                {isAuthenticated && <UserMenu />}
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
