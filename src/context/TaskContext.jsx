import React, { useReducer, useEffect, useRef, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskService } from "../services/taskService.js";

export const TaskContext = createContext();
import { DEFAULT_VALUES, ERROR_MESSAGES } from "../constants/index.js";

// task validation helper
const validateTask = (task) => {
  if (!task || typeof task !== "object") return false;

  const validPriorities = ["high", "medium", "low"];
  const validCategories = [
    "personal",
    "work",
    "shopping",
    "health",
    "education",
    "finance",
    "home",
    "travel",
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
        priority: action.payload.priority || DEFAULT_VALUES.PRIORITY,
        category: action.payload.category || DEFAULT_VALUES.CATEGORY,
        completed: false,
        notes: action.payload.notes || DEFAULT_VALUES.NOTES,
        created_at: new Date().toISOString(),
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
    case "add_task_from_db": {
      // add task from real-time subscription
      const task = action.payload;
      if (!validateTask(task)) {
        console.warn("Invalid task from database, skipping:", task);
        return state;
      }

      // check if task already exists to avoid duplicates
      const exists = state.tasks.some((t) => t.id === task.id);
      if (exists) return state;

      return {
        ...state,
        tasks: [task, ...state.tasks],
      };
    }
    case "update_task_from_db": {
      // update task from real-time subscription
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      };
    }
    case "delete_task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "delete_task_from_db": {
      // delete task from real-time subscription
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }
    case "toggle_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
                updated_at: new Date().toISOString(),
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
        updated_at: new Date().toISOString(),
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

// supabase integration with real-time updates
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const [saveError, setSaveError] = React.useState(null);
  const isInitialized = useRef(false);
  const subscriptionRef = useRef(null);

  // load tasks from Supabase on mount
  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        const { data, error } = await TaskService.getTasks();
        if (error) {
          console.error("Error loading tasks from Supabase:", error);
          setSaveError(ERROR_MESSAGES.LOAD_FAILED);
          dispatch({ type: "load_tasks", payload: [] });
        } else {
          dispatch({ type: "load_tasks", payload: data || [] });
          setSaveError(null);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        setSaveError(ERROR_MESSAGES.LOAD_FAILED);
        dispatch({ type: "load_tasks", payload: [] });
      } finally {
        setIsLoading(false);
        isInitialized.current = true;
      }
    };

    loadInitialTasks();
  }, []);

  // set up real-time subscription
  useEffect(() => {
    if (isInitialized.current) {
      const subscription = TaskService.subscribeToTasks((payload) => {
        console.log("Real-time update received:", payload);

        switch (payload.eventType) {
          case "INSERT":
            dispatch({ type: "add_task_from_db", payload: payload.new });
            break;
          case "UPDATE":
            dispatch({ type: "update_task_from_db", payload: payload.new });
            break;
          case "DELETE":
            dispatch({ type: "delete_task_from_db", payload: payload.old.id });
            break;
          default:
            break;
        }
      });

      subscriptionRef.current = subscription;

      return () => {
        if (subscriptionRef.current) {
          TaskService.unsubscribe(subscriptionRef.current);
        }
      };
    }
  }, [isInitialized.current]);

  const addTask = async (
    text,
    priority = DEFAULT_VALUES.PRIORITY,
    category = DEFAULT_VALUES.CATEGORY,
    notes = DEFAULT_VALUES.NOTES
  ) => {
    // update to UI immediately
    const optimisticTask = {
      id: uuidv4(),
      text: text?.trim() || "",
      priority,
      category,
      completed: false,
      notes,
      created_at: new Date().toISOString(),
    };

    dispatch({
      type: "add_task",
      payload: optimisticTask,
    });

    // save to database
    try {
      const { data, error } = await TaskService.addTask(optimisticTask);
      if (error) {
        console.error("Error saving task to database:", error);
        setSaveError(ERROR_MESSAGES.SAVE_FAILED);
        // remove the optimistic task on error
        dispatch({ type: "delete_task", payload: optimisticTask.id });
      } else {
        setSaveError(null);
        // update with the actual task from database (includes server-generated fields)
        dispatch({ type: "update_task_from_db", payload: data });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setSaveError(ERROR_MESSAGES.SAVE_FAILED);
      dispatch({ type: "delete_task", payload: optimisticTask.id });
    }
  };

  const deleteTask = async (id) => {
    // update - remove from UI immediately
    dispatch({ type: "delete_task", payload: id });

    // delete from database
    try {
      const { error } = await TaskService.deleteTask(id);
      if (error) {
        console.error("Error deleting task from database:", error);
        setSaveError(ERROR_MESSAGES.SAVE_FAILED);
        // Reload tasks to restore the deleted task
        const { data } = await TaskService.getTasks();
        dispatch({ type: "load_tasks", payload: data || [] });
      } else {
        setSaveError(null);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setSaveError(ERROR_MESSAGES.SAVE_FAILED);
      // reload tasks to restore the deleted task
      const { data } = await TaskService.getTasks();
      dispatch({ type: "load_tasks", payload: data || [] });
    }
  };

  const toggleTask = async (id) => {
    // find the current task to get its completion status
    const currentTask = state.tasks.find((task) => task.id === id);
    if (!currentTask) return;

    const newCompleted = !currentTask.completed;

    //  update UI immediately
    dispatch({ type: "toggle_task", payload: id });

    // update in database
    try {
      const { error } = await TaskService.toggleTask(id, newCompleted);
      if (error) {
        console.error("Error updating task in database:", error);
        setSaveError(ERROR_MESSAGES.SAVE_FAILED);
        // revert the optimistic update
        dispatch({ type: "toggle_task", payload: id });
      } else {
        setSaveError(null);
      }
    } catch (error) {
      console.error("Error toggling task:", error);
      setSaveError(ERROR_MESSAGES.SAVE_FAILED);
      // revert the update
      dispatch({ type: "toggle_task", payload: id });
    }
  };

  const editTask = async (id, newText, priority, category, notes) => {
    // update UI immediately
    dispatch({
      type: "edit_task",
      payload: { id, newText, priority, category, notes },
    });

    // update in database
    try {
      const updates = {
        text: newText?.trim(),
        ...(priority && { priority }),
        ...(category && { category }),
        ...(notes !== undefined && { notes }),
      };

      const { error } = await TaskService.updateTask(id, updates);
      if (error) {
        console.error("Error updating task in database:", error);
        setSaveError(ERROR_MESSAGES.SAVE_FAILED);
        // reload tasks to restore the original state
        const { data } = await TaskService.getTasks();
        dispatch({ type: "load_tasks", payload: data || [] });
      } else {
        setSaveError(null);
      }
    } catch (error) {
      console.error("Error editing task:", error);
      setSaveError(ERROR_MESSAGES.SAVE_FAILED);
      // reload tasks to restore the original state
      const { data } = await TaskService.getTasks();
      dispatch({ type: "load_tasks", payload: data || [] });
    }
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
