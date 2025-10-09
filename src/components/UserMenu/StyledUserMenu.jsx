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

export const MenuContainer = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${SPACING.sm};
  padding: ${SPACING.sm} ${SPACING.md};
  background: ${(props) =>
    props.$isOpen ? "rgba(93, 78, 195, 0.15)" : "rgba(93, 78, 195, 0.1)"};
  border: 1px solid
    ${(props) => (props.$isOpen ? "rgba(93, 78, 195, 0.3)" : "transparent")};
  border-radius: ${BORDER_RADIUS.md};
  color: ${COLORS.accentPrimary};
  font-size: ${FONT_SIZES.sm};
  font-weight: ${FONT_WEIGHTS.medium};
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: rgba(93, 78, 195, 0.15);
    border-color: rgba(93, 78, 195, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const UserBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${BORDER_RADIUS.full};
  background: linear-gradient(
    135deg,
    ${COLORS.accentPrimary},
    ${COLORS.accentSecondary}
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONT_SIZES.xs};
  font-weight: ${FONT_WEIGHTS.semibold};
  flex-shrink: 0;
`;

export const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + ${SPACING.sm});
  right: 0;
  background: white;
  border-radius: ${BORDER_RADIUS.md};
  box-shadow: ${SHADOWS.md};
  min-width: 220px;
  overflow: hidden;
  z-index: 1000;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const UserInfo = styled.div`
  padding: ${SPACING.lg};
  background: ${COLORS.backgroundSecondary};
`;

export const UserEmail = styled.div`
  font-size: ${FONT_SIZES.md};
  font-weight: ${FONT_WEIGHTS.medium};
  color: ${COLORS.textPrimary};
  margin-bottom: ${SPACING.xs};
  word-break: break-all;
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: ${SPACING.md} ${SPACING.lg};
  border: none;
  background: transparent;
  color: ${COLORS.textPrimary};
  font-size: ${FONT_SIZES.md};
  font-weight: ${FONT_WEIGHTS.medium};
  text-align: left;
  cursor: pointer;
  transition: all ${TRANSITIONS.fast};
  display: flex;
  align-items: center;
  gap: ${SPACING.md};

  &:hover {
    background: ${COLORS.backgroundSecondary};
  }

  &:active {
    background: ${COLORS.backgroundTertiary};
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: ${COLORS.borderLight};
`;
