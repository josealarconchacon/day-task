// constants
export const TIMEOUTS = {
  WELCOME_SCREEN_DURATION: 3000,
  SAVE_DEBOUNCE_DELAY: 500,
  TRANSITION_DELAY: 100,
};

export const STORAGE_KEYS = {
  TASKS: "dayTask_tasks",
  PREFERENCES: "dayTask_preferences",
  SETTINGS: "dayTask_settings",
};

export const LIMITS = {
  MAX_TASK_LENGTH: 500,
  MAX_NOTES_LENGTH: 1000,
  NOTES_PREVIEW_LENGTH: 50,
};

export const ERROR_MESSAGES = {
  STORAGE_UNAVAILABLE:
    "Unable to save tasks. Please check your browser settings.",
  TASK_TOO_LONG:
    "Task description is too long. Please keep it under 500 characters.",
  INVALID_TASK: "Please enter a valid task description.",
  SAVE_FAILED: "Failed to save tasks. Changes may be lost.",
  LOAD_FAILED: "Failed to load tasks. Please refresh the page.",
  QUOTA_EXCEEDED: "Storage quota exceeded. Consider cleaning up old data.",
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
