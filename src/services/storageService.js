const STORAGE_KEYS = {
  ANONYMOUS_TASK_COUNT: "day_task_anonymous_count",
  ANONYMOUS_TASK_LIMIT_SHOWN: "day_task_limit_shown",
  ANONYMOUS_TASK_IDS: "day_task_anonymous_task_ids",
};

export class StorageService {
  /**
   * anonymous task count
   * @returns {number}
   */
  static getAnonymousTaskCount() {
    try {
      const count = localStorage.getItem(STORAGE_KEYS.ANONYMOUS_TASK_COUNT);
      return count ? parseInt(count, 10) : 0;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return 0;
    }
  }

  /**
   * increment anonymous task count
   * @returns {number}
   */
  static incrementAnonymousTaskCount() {
    try {
      const currentCount = this.getAnonymousTaskCount();
      const newCount = currentCount + 1;
      localStorage.setItem(
        STORAGE_KEYS.ANONYMOUS_TASK_COUNT,
        newCount.toString()
      );
      return newCount;
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      return this.getAnonymousTaskCount();
    }
  }

  /**
   * add a task ID to the anonymous task list
   * @param {string} taskId
   */
  static addAnonymousTaskId(taskId) {
    try {
      const taskIds = this.getAnonymousTaskIds();
      taskIds.push(taskId);
      localStorage.setItem(
        STORAGE_KEYS.ANONYMOUS_TASK_IDS,
        JSON.stringify(taskIds)
      );
    } catch (error) {
      console.error("Error saving anonymous task ID:", error);
    }
  }

  /**
   * list of anonymous task IDs
   * @returns {string[]}
   */
  static getAnonymousTaskIds() {
    try {
      const taskIds = localStorage.getItem(STORAGE_KEYS.ANONYMOUS_TASK_IDS);
      return taskIds ? JSON.parse(taskIds) : [];
    } catch (error) {
      console.error("Error reading anonymous task IDs:", error);
      return [];
    }
  }

  static clearAnonymousTaskCount() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ANONYMOUS_TASK_COUNT);
      localStorage.removeItem(STORAGE_KEYS.ANONYMOUS_TASK_LIMIT_SHOWN);
      localStorage.removeItem(STORAGE_KEYS.ANONYMOUS_TASK_IDS);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  /**
   * check if anonymous task limit has been reached
   * @param {number} limit - maximum number 5
   * @returns {boolean}
   */
  static hasReachedAnonymousLimit(limit = 5) {
    return this.getAnonymousTaskCount() >= limit;
  }

  /**
   * check if limit notification has been shown
   * @returns {boolean}
   */
  static hasShownLimitNotification() {
    try {
      return (
        localStorage.getItem(STORAGE_KEYS.ANONYMOUS_TASK_LIMIT_SHOWN) === "true"
      );
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return false;
    }
  }

  static markLimitNotificationShown() {
    try {
      localStorage.setItem(STORAGE_KEYS.ANONYMOUS_TASK_LIMIT_SHOWN, "true");
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }

  /**
   * @param {string} key
   * @param {*} defaultValue
   * @returns {*}
   */
  static get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }

  /**
   * remove a value from localStorage
   * @param {string} key
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
}
