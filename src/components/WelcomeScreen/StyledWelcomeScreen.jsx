import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const WelcomeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 50%, #fd79a8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
`;

export const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 75% 75%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  animation: ${float} 6s ease-in-out infinite;
`;

export const WelcomeContent = styled.div`
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 40px 20px;
  animation: ${slideIn} 0.8s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 20px 15px;
    max-width: 90%;
  }
`;

export const Logo = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  animation: ${pulse} 2s ease-in-out infinite;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 15px;
  }
`;

export const AppTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
`;

export const AppSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out 0.6s both;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    gap: 8px;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1rem;
  opacity: 0.9;

  span {
    color: #00b894;
    font-weight: bold;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const GetStartedButton = styled.div`
  animation: ${fadeIn} 0.8s ease-out 0.8s both;
`;
