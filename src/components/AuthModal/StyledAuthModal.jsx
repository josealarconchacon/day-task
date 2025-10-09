import styled from "styled-components";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
  FONT_WEIGHTS,
  TRANSITIONS,
  SHADOWS,
} from "../../styles/designTokens";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: ${BORDER_RADIUS.xl};
  padding: ${SPACING.xxxl};
  width: 90%;
  max-width: 440px;
  box-shadow: ${SHADOWS.md}, 0 8px 32px rgba(0, 0, 0, 0.12);
  animation: slideUp 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: ${SPACING.xxl};
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: ${SPACING.xxl};
`;

export const ModalIcon = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto ${SPACING.lg};
  background: linear-gradient(
    135deg,
    ${COLORS.accentPrimary} 0%,
    ${COLORS.accentSecondary} 100%
  );
  border-radius: ${BORDER_RADIUS.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 4px 16px rgba(93, 78, 195, 0.25);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 ${SPACING.sm};
  color: ${COLORS.textPrimary};
  font-size: ${FONT_SIZES.xxxl};
  font-weight: ${FONT_WEIGHTS.semibold};
  letter-spacing: -0.02em;
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  color: ${COLORS.textSecondary};
  font-size: ${FONT_SIZES.md};
  line-height: 1.5;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: ${SPACING.sm};
  margin-bottom: ${SPACING.xxl};
  background: ${COLORS.backgroundSecondary};
  padding: ${SPACING.xs};
  border-radius: ${BORDER_RADIUS.md};
`;

export const Tab = styled.button`
  flex: 1;
  padding: ${SPACING.md} ${SPACING.lg};
  border: none;
  background: ${(props) => (props.$active ? "white" : "transparent")};
  color: ${(props) =>
    props.$active ? COLORS.accentPrimary : COLORS.textSecondary};
  font-size: ${FONT_SIZES.md};
  font-weight: ${FONT_WEIGHTS.medium};
  border-radius: ${BORDER_RADIUS.sm};
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};
  box-shadow: ${(props) => (props.$active ? SHADOWS.sm : "none")};

  &:hover {
    background: ${(props) =>
      props.$active ? "white" : "rgba(255, 255, 255, 0.5)"};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.sm};
`;

export const Label = styled.label`
  color: ${COLORS.textPrimary};
  font-size: ${FONT_SIZES.md};
  font-weight: ${FONT_WEIGHTS.medium};
`;

export const Input = styled.input`
  padding: ${SPACING.md} ${SPACING.lg};
  border: 1.5px solid ${COLORS.borderLight};
  border-radius: ${BORDER_RADIUS.md};
  font-size: ${FONT_SIZES.lg};
  color: ${COLORS.textPrimary};
  transition: all ${TRANSITIONS.fast};
  background: ${COLORS.backgroundPrimary};

  &:focus {
    outline: none;
    border-color: ${COLORS.accentPrimary};
    box-shadow: 0 0 0 3px rgba(93, 78, 195, 0.1);
  }

  &::placeholder {
    color: ${COLORS.textMuted};
  }

  &:disabled {
    background: ${COLORS.backgroundSecondary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SubmitButton = styled.button`
  padding: ${SPACING.md} ${SPACING.xxl};
  background: linear-gradient(
    135deg,
    ${COLORS.accentPrimary} 0%,
    ${COLORS.accentSecondary} 100%
  );
  color: white;
  border: none;
  border-radius: ${BORDER_RADIUS.md};
  font-size: ${FONT_SIZES.lg};
  font-weight: ${FONT_WEIGHTS.semibold};
  cursor: pointer;
  transition: all ${TRANSITIONS.normal};
  box-shadow: 0 2px 8px rgba(93, 78, 195, 0.25);
  margin-top: ${SPACING.sm};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(93, 78, 195, 0.35);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  padding: ${SPACING.md} ${SPACING.xxl};
  background: transparent;
  color: ${COLORS.textSecondary};
  border: 1.5px solid ${COLORS.borderLight};
  border-radius: ${BORDER_RADIUS.md};
  font-size: ${FONT_SIZES.md};
  font-weight: ${FONT_WEIGHTS.medium};
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.borderMedium};
    background: ${COLORS.backgroundSecondary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.div`
  padding: ${SPACING.md} ${SPACING.lg};
  background: ${COLORS.error}15;
  border: 1px solid ${COLORS.error}30;
  border-radius: ${BORDER_RADIUS.md};
  color: ${COLORS.error};
  font-size: ${FONT_SIZES.md};
  margin-bottom: ${SPACING.lg};
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
`;

export const SuccessMessage = styled.div`
  padding: ${SPACING.md} ${SPACING.lg};
  background: ${COLORS.success}15;
  border: 1px solid ${COLORS.success}30;
  border-radius: ${BORDER_RADIUS.md};
  color: ${COLORS.success};
  font-size: ${FONT_SIZES.md};
  margin-bottom: ${SPACING.lg};
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
`;

export const InfoMessage = styled.div`
  padding: ${SPACING.md} ${SPACING.lg};
  background: ${COLORS.info}10;
  border: 1px solid ${COLORS.info}20;
  border-radius: ${BORDER_RADIUS.md};
  color: ${COLORS.info};
  font-size: ${FONT_SIZES.sm};
  margin-top: ${SPACING.lg};
  text-align: center;
  line-height: 1.5;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${COLORS.borderLight};
  margin: ${SPACING.xxl} 0;
  position: relative;

  &::after {
    content: "or";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 0 ${SPACING.md};
    color: ${COLORS.textMuted};
    font-size: ${FONT_SIZES.sm};
  }
`;

export const PasswordStrength = styled.div`
  height: 4px;
  background: ${COLORS.backgroundTertiary};
  border-radius: 2px;
  overflow: hidden;
  margin-top: ${SPACING.xs};
`;

export const PasswordStrengthBar = styled.div`
  height: 100%;
  background: ${(props) => {
    switch (props.$strength) {
      case "weak":
        return COLORS.error;
      case "medium":
        return COLORS.warning;
      case "strong":
        return COLORS.success;
      default:
        return COLORS.backgroundTertiary;
    }
  }};
  width: ${(props) => {
    switch (props.$strength) {
      case "weak":
        return "33%";
      case "medium":
        return "66%";
      case "strong":
        return "100%";
      default:
        return "0%";
    }
  }};
  transition: all ${TRANSITIONS.normal};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${SPACING.lg};
  right: ${SPACING.lg};
  background: transparent;
  border: none;
  color: ${COLORS.textMuted};
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${BORDER_RADIUS.sm};
  transition: all ${TRANSITIONS.fast};

  &:hover {
    background: ${COLORS.backgroundSecondary};
    color: ${COLORS.textPrimary};
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
