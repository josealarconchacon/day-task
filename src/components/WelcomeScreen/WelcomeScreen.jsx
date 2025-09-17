import React from "react";
import Button from "../Button/Button.jsx";
import {
  WelcomeContainer,
  WelcomeContent,
  Logo,
  AppTitle,
  AppSubtitle,
  FeatureList,
  FeatureItem,
  GetStartedButton,
  BackgroundPattern,
} from "./StyledWelcomeScreen.jsx";

const WelcomeScreen = ({ onGetStarted }) => {
  const features = [
    "Simple task management",
    "Mark tasks as complete",
    "Filter by status",
    "Auto-save to browser",
    "Works offline",
  ];

  return (
    <WelcomeContainer>
      <BackgroundPattern />
      <WelcomeContent>
        <Logo>✓</Logo>
        <AppTitle>Day Task</AppTitle>
        <AppSubtitle>
          Organize your daily tasks with simplicity and efficiency
        </AppSubtitle>

        <FeatureList>
          {features.map((feature, index) => (
            <FeatureItem key={index}>
              <span>•</span>
              {feature}
            </FeatureItem>
          ))}
        </FeatureList>

        <GetStartedButton>
          <Button
            variant="primary"
            onClick={onGetStarted}
            style={{ fontSize: "18px", padding: "15px 30px" }}
          >
            Get Started
          </Button>
        </GetStartedButton>
      </WelcomeContent>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;
