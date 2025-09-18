import { useState, useEffect, useCallback, useRef } from "react";
import {
  getFromStorage,
  saveToStorage,
  isStorageAvailable,
} from "../utils/localStorage.js";

// syncs state with localStorage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const initialValueRef = useRef(initialValue);

  // re-run effect when key changes, not when initialValue reference changes
  useEffect(() => {
    if (!isStorageAvailable()) {
      console.warn("localStorage not available, using memory storage only");
      setIsLoading(false);
      return;
    }

    try {
      const item = getFromStorage(key, initialValueRef.current);
      setStoredValue(item);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setStoredValue(initialValueRef.current);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

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
        return;
      }
    },
    [key]
  );

  return [storedValue, setValue, isLoading];
};
