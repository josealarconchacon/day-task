import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

/**
 * useAuth - Hook for accessing authentication context
 *
 * Provides easy access to auth state and methods throughout the app
 *
 * @returns {Object} Auth context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
