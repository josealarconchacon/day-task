import React from "react";
import styled from "styled-components";
import { useTasks } from "../../hooks/useTasks.js";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCards from "./StatsCards";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  background: #f8fafc;
  min-height: 100vh;
  transition: margin-left 0.3s ease;

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Section = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

const Dashboard = () => {
  const { tasks } = useTasks();

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentArea>
          <StatsCards tasks={tasks} />
          
          <Section>
            <SectionTitle>
              <span>📝</span>
              Quick Add Task
            </SectionTitle>
            <TaskForm />
          </Section>

          <Section>
            <SectionTitle>
              <span>📋</span>
              Task Management
            </SectionTitle>
            <TaskList />
          </Section>
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
