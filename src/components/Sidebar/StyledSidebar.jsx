import styled from "styled-components";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SHADOWS,
  TRANSITIONS,
} from "../../styles/designTokens";

export const SidebarContainer = styled.aside`
  position: sticky;
  top: ${SPACING.xl};
  width: 280px;
  height: calc(100vh - 40px);
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${BORDER_RADIUS.xl};
  border: 1px solid ${COLORS.borderLight};
  box-shadow: ${SHADOWS.md};
  padding: ${SPACING.lg};
  transition: all ${TRANSITIONS.normal};

  /* custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.backgroundSecondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.borderMedium};
    border-radius: 4px;

    &:hover {
      background: ${COLORS.borderDark};
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    left: ${(props) => (props.$isOpen ? "0" : "-100%")};
    top: 64px; /* Start below mobile header */
    width: 320px;
    height: calc(100vh - 64px); /* Adjust height to account for header */
    max-height: calc(100vh - 64px);
    z-index: 1000;
    border-radius: 0;
    border-left: none;
    transition: left ${TRANSITIONS.normal};
  }

  @media (max-width: 768px) {
    width: 280px;
    top: 56px; /* Smaller header height on mobile */
    height: calc(100vh - 56px); /* Adjust height for smaller header */
    max-height: calc(100vh - 56px);
  }
`;

export const SidebarOverlay = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 999;
    opacity: ${(props) => (props.$isOpen ? "1" : "0")};
    pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
    transition: opacity ${TRANSITIONS.normal};
  }
`;

export const SidebarSection = styled.div`
  margin-bottom: ${SPACING.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SidebarTitle = styled.h3`
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.semibold};
  color: ${COLORS.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${SPACING.sm};
  padding-bottom: ${SPACING.xs};
  border-bottom: 1px solid ${COLORS.borderLight};
`;

export const SidebarButton = styled.button`
  width: 100%;
  padding: ${SPACING.sm} ${SPACING.md};
  border: 1px solid
    ${(props) => (props.$active ? COLORS.accentSecondary : COLORS.borderLight)};
  border-radius: ${BORDER_RADIUS.md};
  background-color: ${(props) =>
    props.$active ? COLORS.accentSecondary : COLORS.backgroundPrimary};
  color: ${(props) =>
    props.$active ? COLORS.backgroundPrimary : COLORS.textSecondary};
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.sm};
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.medium};
  margin-bottom: ${SPACING.xs};
  text-align: left;

  &:hover {
    background-color: ${(props) =>
      props.$active ? COLORS.accentPrimary : COLORS.backgroundSecondary};
    border-color: ${(props) =>
      props.$active ? COLORS.accentPrimary : COLORS.borderMedium};
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(0);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color ${TRANSITIONS.fast},
      border-color ${TRANSITIONS.fast};

    &:hover {
      transform: none;
    }
  }
`;

export const SidebarButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
`;

export const SidebarBadge = styled.span`
  background-color: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.2)" : COLORS.backgroundTertiary};
  color: ${(props) =>
    props.$active ? COLORS.backgroundPrimary : COLORS.textSecondary};
  padding: 2px ${SPACING.sm};
  border-radius: ${BORDER_RADIUS.sm};
  font-size: ${FONT_SIZES.xs};
  font-weight: ${FONT_WEIGHTS.semibold};
  min-width: 24px;
  text-align: center;
`;

export const SidebarDivider = styled.hr`
  border: none;
  border-top: 1px solid ${COLORS.borderLight};
  margin: ${SPACING.md} 0;
`;

export const SortCheckboxContainer = styled.div`
  padding: ${SPACING.md};
  background-color: ${COLORS.backgroundSecondary};
  border-radius: ${BORDER_RADIUS.md};
  border: 1px solid ${COLORS.borderLight};
  transition: all ${TRANSITIONS.fast};

  &:hover {
    background-color: ${COLORS.backgroundTertiary};
    border-color: ${COLORS.borderMedium};
  }
`;

export const SortCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${SPACING.md};
  font-size: ${FONT_SIZES.md};
  font-weight: ${FONT_WEIGHTS.medium};
  color: ${COLORS.textPrimary};
  cursor: pointer;
  transition: color ${TRANSITIONS.fast};

  &:hover {
    color: ${COLORS.accentSecondary};
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: ${BORDER_RADIUS.sm};
    border: 2px solid ${COLORS.borderMedium};
    background-color: ${COLORS.backgroundPrimary};
    transition: all ${TRANSITIONS.fast};
    appearance: none;
    position: relative;
    flex-shrink: 0;

    &:checked {
      background-color: ${COLORS.accentSecondary};
      border-color: ${COLORS.accentSecondary};
    }

    &:checked::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    &:hover {
      border-color: ${COLORS.accentSecondary};
      box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
    }

    &:focus {
      outline: none;
      border-color: ${COLORS.accentSecondary};
      box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
    }
  }
`;

export const SortDescription = styled.div`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.textMuted};
  margin-top: ${SPACING.sm};
  line-height: 1.4;
`;

// Mobile header bar for toggle button
export const MobileHeader = styled.header`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${COLORS.borderLight};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    z-index: 1001;
    align-items: center;
    padding: 0 ${SPACING.lg};
    gap: ${SPACING.md};
    transition: all ${TRANSITIONS.normal};
  }

  @media (max-width: 768px) {
    height: 56px;
    padding: 0 ${SPACING.md};
  }
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${BORDER_RADIUS.md};
  background: ${(props) =>
    props.$isOpen ? COLORS.accentSecondary : "transparent"};
  color: ${(props) => (props.$isOpen ? "white" : COLORS.textPrimary)};
  border: 1px solid
    ${(props) => (props.$isOpen ? COLORS.accentSecondary : COLORS.borderMedium)};
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};
  flex-shrink: 0;

  &:hover {
    background: ${(props) =>
      props.$isOpen ? COLORS.accentPrimary : COLORS.backgroundSecondary};
    border-color: ${(props) =>
      props.$isOpen ? COLORS.accentPrimary : COLORS.borderDark};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }

    &:active {
      transform: none;
    }
  }
`;

export const MenuIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform ${TRANSITIONS.fast};

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;

export const MobileHeaderBranding = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.md};
  flex: 1;
`;

export const MobileBrandIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${BORDER_RADIUS.md};
  background: linear-gradient(
    135deg,
    ${COLORS.accentSecondary},
    ${COLORS.accentPrimary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${SHADOWS.sm};

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;

    &::after {
      width: 6px;
      height: 6px;
    }
  }
`;

export const MobileBrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MobileBrandTitle = styled.h1`
  font-size: ${FONT_SIZES.xxl};
  font-weight: ${FONT_WEIGHTS.semibold};
  color: ${COLORS.textPrimary};
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${FONT_SIZES.xl};
  }
`;

export const MobileBrandSubtitle = styled.p`
  font-size: ${FONT_SIZES.xs};
  color: ${COLORS.textMuted};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileHeaderSpacer = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    height: 64px;
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 56px;
  }
`;
