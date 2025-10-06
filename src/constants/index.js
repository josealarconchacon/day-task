// constants
export const TIMEOUTS = {
  WELCOME_SCREEN_DURATION: 3000,
  SAVE_DEBOUNCE_DELAY: 500,
  TRANSITION_DELAY: 100,
};


export const LIMITS = {
  MAX_TASK_LENGTH: 500,
  MAX_NOTES_LENGTH: 1000,
  NOTES_PREVIEW_LENGTH: 50,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network connection error. Please check your internet connection.",
  TASK_TOO_LONG:
    "Task description is too long. Please keep it under 500 characters.",
  INVALID_TASK: "Please enter a valid task description.",
  SAVE_FAILED: "Failed to save tasks. Please try again.",
  LOAD_FAILED: "Failed to load tasks. Please refresh the page.",
  DATABASE_ERROR: "Database connection error. Please try again later.",
};

export const UI_STATES = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  IDLE: "idle",
};

export const TASK_FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const PRIORITY_LEVELS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const DEFAULT_VALUES = {
  PRIORITY: "medium",
  CATEGORY: "personal",
  NOTES: "",
};
