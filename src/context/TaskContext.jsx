import React, { useReducer, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "./TaskContext.js";
import {
  getFromStorage,
  saveToStorage,
  isStorageAvailable,
} from "../utils/localStorage.js";

// task validation helper
const validateTask = (task) => {
  if (!task || typeof task !== "object") return false;

  const validPriorities = ["high", "medium", "low"];
  const validCategories = [
    "personal",
    "work",
    "health",
    "finance",
    "education",
    "social",
  ];

  return (
    typeof task.id === "string" &&
    typeof task.text === "string" &&
    task.text.trim().length > 0 &&
    typeof task.completed === "boolean" &&
    validPriorities.includes(task.priority || "medium") &&
    validCategories.includes(task.category || "personal") &&
    (task.notes === undefined || typeof task.notes === "string")
  );
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "load_tasks": {
      // validate and filter loaded tasks
      const validTasks = Array.isArray(action.payload)
        ? action.payload.filter((task) => {
            const isValid = validateTask(task);
            if (!isValid) {
              console.warn("Invalid task found during load, skipping:", task);
            }
            return isValid;
          })
        : [];

      return {
        ...state,
        tasks: validTasks,
      };
    }
    case "add_task": {
      const newTask = {
        id: uuidv4(),
        text: action.payload.text?.trim() || "",
        priority: action.payload.priority || "medium",
        category: action.payload.category || "personal",
        completed: false,
        notes: action.payload.notes || "",
        createdAt: new Date().toISOString(),
      };

      // validate before adding
      if (!validateTask(newTask)) {
        console.error("Cannot add invalid task:", newTask);
        return state;
      }

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }
    case "delete_task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "toggle_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
                updatedAt: new Date().toISOString(),
              }
            : task
        ),
      };
    case "edit_task": {
      const updatedTask = {
        text: action.payload.newText?.trim(),
        ...(action.payload.priority && { priority: action.payload.priority }),
        ...(action.payload.category && { category: action.payload.category }),
        ...(action.payload.notes !== undefined && {
          notes: action.payload.notes,
        }),
        updatedAt: new Date().toISOString(),
      };

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...updatedTask } : task
        ),
      };
    }
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
};

// localStorage integration with debouncing
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const [saveError, setSaveError] = React.useState(null);
  const isInitialized = useRef(false);
  const saveTimeoutRef = useRef(null);

  // debounced save function
  const debouncedSave = useCallback((tasks) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        if (isStorageAvailable()) {
          const success = saveToStorage("dayTask_tasks", tasks);
          if (success) {
            setSaveError(null);
          } else {
            setSaveError("Failed to save tasks. Changes may be lost.");
          }
        }
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
        setSaveError("Failed to save tasks. Please check your storage space.");
      }
    }, 500);
  }, []);

  // load tasks from localStorage on mount
  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        if (isStorageAvailable()) {
          const savedTasks = getFromStorage("dayTask_tasks", []);
          dispatch({ type: "load_tasks", payload: savedTasks });
        } else {
          console.warn(
            "localStorage not available, running in memory-only mode"
          );
        }
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
        dispatch({ type: "load_tasks", payload: [] });
      } finally {
        setIsLoading(false);
        isInitialized.current = true;
      }
    };

    loadInitialTasks();
  }, []);

  // save tasks to localStorage with debouncing
  useEffect(() => {
    if (isInitialized.current && !isLoading) {
      debouncedSave(state.tasks);
    }
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.tasks, isLoading, debouncedSave]);

  const addTask = (
    text,
    priority = "medium",
    category = "personal",
    notes = ""
  ) => {
    dispatch({
      type: "add_task",
      payload: { text, priority, category, notes },
    });
  };

  const deleteTask = (id) => {
    dispatch({ type: "delete_task", payload: id });
  };

  const toggleTask = (id) => {
    dispatch({ type: "toggle_task", payload: id });
  };

  const editTask = (id, newText, priority, category, notes) => {
    dispatch({
      type: "edit_task",
      payload: { id, newText, priority, category, notes },
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        isLoading,
        saveError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
