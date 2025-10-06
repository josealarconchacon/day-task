import React, { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
  color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const Logo = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 0.875rem;
    color: #a0aec0;
    margin: 4px 0 0 0;
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 24px 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border-left-color: #667eea;
  }
  
  &.active {
    background: rgba(102, 126, 234, 0.1);
    color: white;
    border-left-color: #667eea;
  }
  
  span {
    font-size: 1.25rem;
  }
  
  div {
    font-weight: 500;
  }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
  @media (max-width: 1024px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: "📊", label: "Dashboard", active: true },
    { icon: "📝", label: "Tasks" },
    { icon: "📈", label: "Analytics" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <>
      <MobileToggle onClick={() => setIsOpen(!isOpen)}>
        ☰
      </MobileToggle>
      
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      
      <SidebarContainer $isOpen={isOpen}>
        <Logo>
          <h1>DayLily</h1>
          <p>Task Management Dashboard</p>
        </Logo>
        
        <Nav>
          {navItems.map((item, index) => (
            <NavItem key={index} className={item.active ? 'active' : ''}>
              <span>{item.icon}</span>
              <div>{item.label}</div>
            </NavItem>
          ))}
        </Nav>
        
        <div style={{ padding: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div style={{ fontSize: "0.875rem", color: "#a0aec0" }}>
            Made with ❤️
          </div>
        </div>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
