import { STORAGE_KEYS } from "../constants/index.js";

const STORAGE_KEY = STORAGE_KEYS.TASKS;

// get data from localStorage
export const getFromStorage = (key = STORAGE_KEY, defaultValue = []) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
};

// save data to localStorage
export const saveToStorage = (key = STORAGE_KEY, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
    if (error.name === "QuotaExceededError") {
      console.warn(
        "localStorage quota exceeded. Consider cleaning up old data."
      );
    }
    return false;
  }
};

// remove data from localStorage
export const removeFromStorage = (key = STORAGE_KEY) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
};

// check if localStorage is available
export const isStorageAvailable = () => {
  try {
    const testKey = "__localStorage_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn("localStorage is not available:", error);
    return false;
  }
};

// get storage usage info (debugging)
export const getStorageInfo = () => {
  if (!isStorageAvailable()) {
    return { available: false };
  }

  try {
    const used = new Blob(Object.values(localStorage)).size;
    const total = 5 * 1024 * 1024; // 5MB typical limit

    return {
      available: true,
      used: used,
      total: total,
      percentage: ((used / total) * 100).toFixed(2),
      remaining: total - used,
    };
  } catch (error) {
    return { available: true, error: error.message };
  }
};

// clear old or corrupted data
export const clearStorage = (keys = [STORAGE_KEY]) => {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    keys.forEach((key) => {
      window.localStorage.removeItem(key);
    });
    console.info(`Cleared localStorage keys: ${keys.join(", ")}`);
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

// backup data to a downloadable JSON file
export const exportData = (key = STORAGE_KEY) => {
  try {
    const data = getFromStorage(key, []);
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `day-task-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error exporting data:", error);
    return false;
  }
};
