import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  MenuContainer,
  MenuButton,
  MenuDropdown,
  MenuItem,
  MenuDivider,
  UserInfo,
  UserEmail,
  UserBadge,
} from "./StyledUserMenu";

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    setIsOpen(false);
    const { success, error } = await signOut();

    if (!success) {
      console.error("Sign out failed:", error);
      // todo: show a toast notification
    }
  };

  if (!user) return null;

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <UserBadge>{user.email[0].toUpperCase()}</UserBadge>
        <span style={{ fontSize: "0.75rem" }}>{user.email}</span>
      </MenuButton>

      {isOpen && (
        <MenuDropdown>
          <UserInfo>
            <UserEmail>{user.email}</UserEmail>
            <div style={{ fontSize: "0.7rem", color: "#86868b" }}>
              Signed in
            </div>
          </UserInfo>
          <MenuDivider />
          <MenuItem onClick={handleSignOut}>
            <span>🚪</span>
            <span>Sign Out</span>
          </MenuItem>
        </MenuDropdown>
      )}
    </MenuContainer>
  );
};

export default UserMenu;
