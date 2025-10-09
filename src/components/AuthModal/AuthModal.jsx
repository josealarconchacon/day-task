import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalSubtitle,
  TabContainer,
  Tab,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  SecondaryButton,
  ErrorMessage,
  SuccessMessage,
  InfoMessage,
  PasswordStrength,
  PasswordStrengthBar,
  CloseButton,
  LoadingSpinner,
} from "./StyledAuthModal";

const AuthModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode: initialMode = "signin",
}) => {
  const { signIn, signUp, resetPassword, authError, clearError } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // reset form when mode changes
  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocalError(null);
    setSuccessMessage(null);
    setShowPasswordReset(false);
    clearError();
  }, [mode, clearError]);

  // update local error from context
  useEffect(() => {
    if (authError) {
      setLocalError(getErrorMessage(authError));
    }
  }, [authError]);

  if (!isOpen) return null;

  const getErrorMessage = (error) => {
    const message = error?.message || error?.toString() || "";

    if (message.includes("Invalid login credentials")) {
      return "Invalid email or password. Please try again.";
    }
    if (message.includes("User already registered")) {
      return "This email is already registered. Please sign in instead.";
    }
    if (message.includes("Password should be at least")) {
      return "Password must be at least 6 characters long.";
    }
    if (message.includes("not available in offline mode")) {
      return "Authentication requires an internet connection.";
    }
    if (message.includes("email")) {
      return "Please enter a valid email address.";
    }

    return message || "An error occurred. Please try again.";
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return null;
    if (password.length < 8) return "weak";

    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return "weak";
    if (strength === 3) return "medium";
    return "strong";
  };

  const validateForm = () => {
    if (!email.trim()) {
      setLocalError("Please enter your email address.");
      return false;
    }

    if (!isValidEmail(email)) {
      setLocalError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setLocalError("Please enter your password.");
      return false;
    }

    if (mode === "signup") {
      if (password.length < 6) {
        setLocalError("Password must be at least 6 characters long.");
        return false;
      }

      if (password !== confirmPassword) {
        setLocalError("Passwords do not match.");
        return false;
      }
    }

    return true;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setLocalError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const { success, error } = await resetPassword(email);

      if (success) {
        setSuccessMessage(
          "Password reset email sent! Check your inbox for instructions."
        );
        setTimeout(() => {
          setShowPasswordReset(false);
          setMode("signin");
        }, 3000);
      } else {
        setLocalError(getErrorMessage(error));
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setLocalError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);
    clearError();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let result;

      if (mode === "signin") {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password);
      }

      if (result.success) {
        if (mode === "signup") {
          setSuccessMessage(
            "Account created successfully! Please check your email to verify your account."
          );

          setTimeout(() => {
            if (onSuccess) {
              onSuccess(result);
            }
            onClose();
          }, 2000);
        } else {
          setSuccessMessage("Signed in successfully!");
          setTimeout(() => {
            if (onSuccess) {
              onSuccess(result);
            }
            onClose();
          }, 500);
        }
      } else {
        setLocalError(getErrorMessage(result.error));
      }
    } catch (error) {
      console.error("Auth error:", error);
      setLocalError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const passwordStrength =
    mode === "signup" ? getPasswordStrength(password) : null;

  if (showPasswordReset) {
    return (
      <Overlay onClick={handleOverlayClick}>
        <ModalContainer>
          <CloseButton
            onClick={() => {
              setShowPasswordReset(false);
              setLocalError(null);
              setSuccessMessage(null);
            }}
            disabled={isLoading}
          >
            ×
          </CloseButton>

          <ModalHeader>
            <ModalIcon>🔑</ModalIcon>
            <ModalTitle>Reset Password</ModalTitle>
            <ModalSubtitle>
              Enter your email and we'll send you a link to reset your password
            </ModalSubtitle>
          </ModalHeader>

          {localError && (
            <ErrorMessage>
              <span>⚠️</span>
              <span>{localError}</span>
            </ErrorMessage>
          )}

          {successMessage && (
            <SuccessMessage>
              <span>✓</span>
              <span>{successMessage}</span>
            </SuccessMessage>
          )}

          <Form onSubmit={handlePasswordReset}>
            <FormGroup>
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span style={{ marginLeft: "8px" }}>Sending...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </SubmitButton>

            <SecondaryButton
              type="button"
              onClick={() => setShowPasswordReset(false)}
              disabled={isLoading}
            >
              Back to Sign In
            </SecondaryButton>
          </Form>
        </ModalContainer>
      </Overlay>
    );
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose} disabled={isLoading}>
          ×
        </CloseButton>

        <ModalHeader>
          <ModalIcon>🔐</ModalIcon>
          <ModalTitle>
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </ModalTitle>
          <ModalSubtitle>
            {mode === "signin"
              ? "Sign in to access all your tasks"
              : "Sign up to sync your tasks across devices"}
          </ModalSubtitle>
        </ModalHeader>

        <TabContainer>
          <Tab
            type="button"
            $active={mode === "signin"}
            onClick={() => setMode("signin")}
            disabled={isLoading}
          >
            Sign In
          </Tab>
          <Tab
            type="button"
            $active={mode === "signup"}
            onClick={() => setMode("signup")}
            disabled={isLoading}
          >
            Sign Up
          </Tab>
        </TabContainer>

        {localError && (
          <ErrorMessage>
            <span>⚠️</span>
            <span>{localError}</span>
          </ErrorMessage>
        )}

        {successMessage && (
          <SuccessMessage>
            <span>✓</span>
            <span>{successMessage}</span>
          </SuccessMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder={
                mode === "signin"
                  ? "Enter your password"
                  : "At least 6 characters"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
            />
            {mode === "signup" && password && (
              <PasswordStrength>
                <PasswordStrengthBar $strength={passwordStrength} />
              </PasswordStrength>
            )}
          </FormGroup>

          {mode === "signup" && (
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
              />
            </FormGroup>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span style={{ marginLeft: "8px" }}>
                  {mode === "signin" ? "Signing In..." : "Creating Account..."}
                </span>
              </>
            ) : (
              <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
            )}
          </SubmitButton>

          {mode === "signin" && (
            <>
              <SecondaryButton
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Continue as Guest
              </SecondaryButton>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  disabled={isLoading}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#5d4ec3",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: "4px",
                  }}
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}
        </Form>

        {mode === "signup" && (
          <InfoMessage>
            By creating an account, your tasks will be securely synced across
            all your devices.
          </InfoMessage>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default AuthModal;
