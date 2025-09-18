import React, { useReducer, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "./TaskContext.js";
import {
  getFromStorage,
  saveToStorage,
  isStorageAvailable,
} from "../utils/localStorage.js";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "load_tasks":
      return {
        ...state,
        tasks: action.payload,
      };
    case "add_task":
      return {
        ...state,
        tasks: [
          {
            id: uuidv4(),
            text: action.payload.text,
            priority: action.payload.priority || "medium",
            completed: false,
          },
          ...state.tasks,
        ],
      };
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
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "edit_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                text: action.payload.newText,
                ...(action.payload.priority && {
                  priority: action.payload.priority,
                }),
              }
            : task
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
};

// localStorage integration
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const isInitialized = useRef(false);

  // load tasks from localStorage on mount
  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        if (isStorageAvailable()) {
          const savedTasks = getFromStorage("dayTask_tasks", []);
          if (savedTasks.length > 0) {
            dispatch({ type: "load_tasks", payload: savedTasks });
          }
        }
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
      } finally {
        setIsLoading(false);
        isInitialized.current = true;
      }
    };

    loadInitialTasks();
  }, []);

  // save tasks to localStorage
  useEffect(() => {
    if (isInitialized.current && !isLoading) {
      try {
        if (isStorageAvailable()) {
          saveToStorage("dayTask_tasks", state.tasks);
        }
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }
  }, [state.tasks, isLoading]);

  const addTask = (text, priority = "medium") => {
    dispatch({ type: "add_task", payload: { text, priority } });
  };

  const deleteTask = (id) => {
    dispatch({ type: "delete_task", payload: id });
  };

  const toggleTask = (id) => {
    dispatch({ type: "toggle_task", payload: id });
  };

  const editTask = (id, newText, priority) => {
    dispatch({ type: "edit_task", payload: { id, newText, priority } });
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
