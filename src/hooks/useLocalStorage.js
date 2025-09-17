import { useState, useEffect, useCallback } from "react";
import {
  getFromStorage,
  saveToStorage,
  isStorageAvailable,
} from "../utils/localStorage.js";

// syncs state with localStorage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isStorageAvailable()) {
      console.warn("localStorage not available, using memory storage only");
      setIsLoading(false);
      return;
    }

    try {
      const item = getFromStorage(key, initialValue);
      setStoredValue(item);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setStoredValue(initialValue);
    } finally {
      setIsLoading(false);
    }
  }, [key, initialValue]);

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((prevValue) => {
          const valueToStore =
            value instanceof Function ? value(prevValue) : value;

          if (isStorageAvailable()) {
            saveToStorage(key, valueToStore);
          }

          return valueToStore;
        });
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    [key]
  );

  return [storedValue, setValue, isLoading];
};

// task specific storage with validation
export const useTaskStorage = () => {
  const [tasks, setTasks, isLoading] = useLocalStorage("dayTask_tasks", []);

  const setValidatedTasks = useCallback(
    (newTasks) => {
      setTasks((prevTasks) => {
        const valueToStore =
          newTasks instanceof Function ? newTasks(prevTasks) : newTasks;

        if (!Array.isArray(valueToStore)) {
          console.warn(
            "Tasks must be an array, received:",
            typeof valueToStore
          );
          return prevTasks;
        }

        const validatedTasks = valueToStore.filter((task) => {
          const isValid =
            task &&
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean";

          if (!isValid) {
            console.warn("Invalid task structure:", task);
          }

          return isValid;
        });

        return validatedTasks;
      });
    },
    [setTasks]
  );

  return [tasks, setValidatedTasks, isLoading];
};
