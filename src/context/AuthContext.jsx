import React, { createContext, useEffect, useState, useCallback } from "react";
import { AuthService } from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // initialize auth state and set up listener
  useEffect(() => {
    let mounted = true;

    // check for existing session on mount
    const initializeAuth = async () => {
      try {
        const { session: currentSession } = await AuthService.getSession();

        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user || null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // listen for auth state changes
    const { data: authListener } = AuthService.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);

        if (mounted) {
          setSession(session);
          setUser(session?.user || null);

          if (session) {
            setAuthError(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // sign up a new user
  const signUp = useCallback(async (email, password) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      const {
        user: newUser,
        session: newSession,
        error,
      } = await AuthService.signUp(email, password);

      if (error) {
        setAuthError(error);
        setIsLoading(false);
        return { success: false, error };
      }

      // update state
      setUser(newUser);
      setSession(newSession);
      setIsLoading(false);

      return { success: true, user: newUser, session: newSession };
    } catch (error) {
      console.error("Sign up error:", error);
      setAuthError(error);
      setIsLoading(false);
      return { success: false, error };
    }
  }, []);

  // sign in an existing user
  const signIn = useCallback(async (email, password) => {
    setAuthError(null);
    setIsLoading(true);

    try {
      const {
        user: authenticatedUser,
        session: newSession,
        error,
      } = await AuthService.signIn(email, password);

      if (error) {
        setAuthError(error);
        setIsLoading(false);
        return { success: false, error };
      }

      // Update state
      setUser(authenticatedUser);
      setSession(newSession);
      setIsLoading(false);

      return { success: true, user: authenticatedUser, session: newSession };
    } catch (error) {
      console.error("Sign in error:", error);
      setAuthError(error);
      setIsLoading(false);
      return { success: false, error };
    }
  }, []);

  // sign out the current user
  const signOut = useCallback(async () => {
    setIsLoading(true);

    try {
      const { error } = await AuthService.signOut();

      if (error) {
        setAuthError(error);
        setIsLoading(false);
        return { success: false, error };
      }

      // clear state
      setUser(null);
      setSession(null);
      setIsLoading(false);

      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      setAuthError(error);
      setIsLoading(false);
      return { success: false, error };
    }
  }, []);

  // send password reset email
  const resetPassword = useCallback(async (email) => {
    setAuthError(null);

    try {
      const { error } = await AuthService.resetPassword(email);

      if (error) {
        setAuthError(error);
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      console.error("Password reset error:", error);
      setAuthError(error);
      return { success: false, error };
    }
  }, []);

  // clear auth errors
  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const value = {
    user,
    session,
    isLoading,
    authError,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
