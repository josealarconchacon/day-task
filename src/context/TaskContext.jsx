import React, {
  useReducer,
  useEffect,
  useRef,
  createContext,
  useState,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskService } from "../services/taskService.js";
import { StorageService } from "../services/storageService.js";
import { DEFAULT_VALUES, ERROR_MESSAGES } from "../constants/index.js";

export const TaskContext = createContext();

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
export const TaskProvider = ({ children, user }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [anonymousTaskCount, setAnonymousTaskCount] = useState(0);
  const subscriptionRef = useRef(null);
  const userId = user?.id || null;

  // initialize anonymous task count and handle migration on mount
  useEffect(() => {
    const migrateTasksOnAuth = async () => {
      if (!userId) {
        // not authenticated - load anonymous task count
        const count = StorageService.getAnonymousTaskCount();
        setAnonymousTaskCount(count);
      } else {
        // user just authenticated - migrate anonymous tasks
        const anonymousTaskIds = StorageService.getAnonymousTaskIds();

        if (anonymousTaskIds.length > 0) {
          console.log(
            `🔄 Migrating ${anonymousTaskIds.length} anonymous tasks to authenticated user...`
          );

          const { success, migratedCount } =
            await TaskService.migrateAnonymousTasks(anonymousTaskIds, userId);

          if (success) {
            console.log(`✅ Successfully migrated ${migratedCount} tasks!`);
          }
        }

        // clear anonymous count and task IDs
        StorageService.clearAnonymousTaskCount();
        setAnonymousTaskCount(0);
      }
    };

    migrateTasksOnAuth();
  }, [userId]);

  // load tasks from Supabase on mount and when user changes
  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        if (userId) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        const { data, error } = await TaskService.getTasks(userId);
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
      }
    };

    loadInitialTasks();

    // set up real-time subscription after initial load
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
    }, userId);

    subscriptionRef.current = subscription;

    return () => {
      if (subscriptionRef.current) {
        TaskService.unsubscribe(subscriptionRef.current);
      }
    };
  }, [userId]);

  // check if user can add more tasks For anonymous users, limit is 5 tasks
  const canAddTask = useCallback(() => {
    if (userId) {
      // authenticated users have no limit
      return true;
    }

    // anonymous users are limited to 5 tasks
    return anonymousTaskCount < 5;
  }, [userId, anonymousTaskCount]);

  //  handle auth requirement
  const handleAuthRequired = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  // auth modal manually (for sign in button)
  const openAuthModal = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  // close auth modal
  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  // reload tasks for the authenticated user
  const handleAuthSuccess = useCallback(async () => {
    setShowAuthModal(false);
  }, []);

  const addTask = async (
    text,
    priority = DEFAULT_VALUES.PRIORITY,
    category = DEFAULT_VALUES.CATEGORY,
    notes = DEFAULT_VALUES.NOTES
  ) => {
    if (!canAddTask()) {
      handleAuthRequired();
      return { success: false, requiresAuth: true };
    }

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

    if (!userId) {
      const newCount = StorageService.incrementAnonymousTaskCount();
      setAnonymousTaskCount(newCount);
      StorageService.addAnonymousTaskId(optimisticTask.id);
    }

    // save to database
    try {
      const { data, error } = await TaskService.addTask(optimisticTask, userId);
      if (error) {
        // Only show error if it's not an offline mode error
        if (error.message !== "Supabase not configured") {
          console.error("Error saving task to database:", error);
          setSaveError(ERROR_MESSAGES.SAVE_FAILED);
          // remove the optimistic task on error
          dispatch({ type: "delete_task", payload: optimisticTask.id });
        } else {
          // In offline mode, keep the optimistic task
          setSaveError(null);
        }
      } else {
        setSaveError(null);
        // update with the actual task from database (includes server-generated fields)
        dispatch({ type: "update_task_from_db", payload: data });
      }
      return { success: true, requiresAuth: false };
    } catch (error) {
      console.error("Error adding task:", error);
      setSaveError(ERROR_MESSAGES.SAVE_FAILED);
      dispatch({ type: "delete_task", payload: optimisticTask.id });
      return { success: false, requiresAuth: false };
    }
  };

  const deleteTask = async (id) => {
    // update - remove from UI immediately
    dispatch({ type: "delete_task", payload: id });

    // delete from database
    try {
      const { error } = await TaskService.deleteTask(id);
      if (error && error.message !== "Supabase not configured") {
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
      if (error && error.message !== "Supabase not configured") {
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
      if (error && error.message !== "Supabase not configured") {
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
        canAddTask,
        anonymousTaskCount,
        showAuthModal,
        handleAuthRequired,
        openAuthModal,
        closeAuthModal,
        handleAuthSuccess,
        isAuthenticated: !!userId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
