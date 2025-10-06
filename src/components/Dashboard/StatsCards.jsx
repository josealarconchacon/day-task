import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$color || '#667eea'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${props => props.$positive ? '#38a169' : '#e53e3e'};
  font-weight: 500;
  
  &::before {
    content: "${props => props.$positive ? '↗' : '↘'}";
    font-size: 0.875rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.$color || '#667eea'};
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.$percentage || 0}%;
`;

const StatsCards = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;

  const stats = [
    {
      icon: "📋",
      label: "Total Tasks",
      value: totalTasks,
      color: "#667eea",
      change: "+12%",
      positive: true
    },
    {
      icon: "✅",
      label: "Completed",
      value: completedTasks,
      color: "#38a169",
      change: "+8%",
      positive: true,
      percentage: completionRate
    },
    {
      icon: "⏳",
      label: "Pending",
      value: pendingTasks,
      color: "#ed8936",
      change: "-5%",
      positive: false
    },
    {
      icon: "🔥",
      label: "High Priority",
      value: highPriorityTasks,
      color: "#e53e3e",
      change: "+3%",
      positive: true
    }
  ];

  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatCard key={index}>
          <StatHeader>
            <StatIcon $color={stat.color}>
              {stat.icon}
            </StatIcon>
            <StatValue>{stat.value}</StatValue>
          </StatHeader>
          
          <StatLabel>{stat.label}</StatLabel>
          
          <StatChange $positive={stat.positive}>
            {stat.change}
          </StatChange>
          
          {stat.percentage !== undefined && (
            <ProgressBar>
              <ProgressFill 
                $color={stat.color} 
                $percentage={stat.percentage}
              />
            </ProgressBar>
          )}
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default StatsCards;
