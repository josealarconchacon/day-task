import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 32px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 0 16px;
    height: 60px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const WelcomeText = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
    margin: 0;
    
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
  
  p {
    font-size: 0.875rem;
    color: #718096;
    margin: 0;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchBox = styled.div`
  position: relative;
  
  input {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 12px 8px 36px;
    width: 300px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    @media (max-width: 768px) {
      width: 200px;
    }
  }
  
  &::before {
    content: "🔍";
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.875rem;
    color: #a0aec0;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f7fafc;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const UserInfo = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  
  div {
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a202c;
  }
  
  p {
    font-size: 0.75rem;
    color: #718096;
    margin: 0;
  }
`;

const Header = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <HeaderContainer>
      <HeaderLeft>
        <WelcomeText>
          <h2>Good day! 👋</h2>
          <p>{formattedDate}</p>
        </WelcomeText>
      </HeaderLeft>
      
      <HeaderRight>
        <SearchBox>
          <input type="text" placeholder="Search tasks..." />
        </SearchBox>
        
        <UserProfile>
          <Avatar>JD</Avatar>
          <UserInfo>
            <div>John Doe</div>
            <p>Product Manager</p>
          </UserInfo>
        </UserProfile>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
