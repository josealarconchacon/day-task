const STORAGE_KEY = "dayTask_tasks";

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
    const total = 5 * 1024 * 1024;

    return {
      available: true,
      used: used,
      total: total,
      percentage: ((used / total) * 100).toFixed(2),
    };
  } catch (error) {
    return { available: true, error: error.message };
  }
};
