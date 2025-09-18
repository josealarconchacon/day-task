// priority levels
export const PRIORITY_LEVELS = {
  high: 3,
  medium: 2,
  low: 1,
};

// configuration for each priority level
export const PRIORITY_CONFIG = {
  high: {
    label: "High",
    shortLabel: "H",
    icon: "🔴",
    color: "#d32f2f",
    backgroundColor: "#ffebee",
    borderColor: "#d32f2f",
    textColor: "#d32f2f",
    hoverColor: "#b71c1c",
    ariaLabel: "High priority task",
    sortOrder: 3,
  },
  medium: {
    label: "Medium",
    shortLabel: "M",
    icon: "🟡",
    color: "#f57c00",
    backgroundColor: "#fff8e1",
    borderColor: "#f57c00",
    textColor: "#f57c00",
    hoverColor: "#e65100",
    ariaLabel: "Medium priority task",
    sortOrder: 2,
  },
  low: {
    label: "Low",
    shortLabel: "L",
    icon: "🟢",
    color: "#2e7d32",
    backgroundColor: "#e8f5e8",
    borderColor: "#2e7d32",
    textColor: "#2e7d32",
    hoverColor: "#1b5e20",
    ariaLabel: "Low priority task",
    sortOrder: 1,
  },
};

// sort tasks
export const sortTasksByPriority = (tasks) => {
  return [...tasks].sort((a, b) => {
    const priorityA = PRIORITY_LEVELS[a.priority] || PRIORITY_LEVELS.medium;
    const priorityB = PRIORITY_LEVELS[b.priority] || PRIORITY_LEVELS.medium;

    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    return 0;
  });
};

// return config for a given priority
export const getPriorityConfig = (priority) => {
  return PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
};

// filter tasks by  priority
export const filterTasksByPriority = (tasks, priority) => {
  return tasks.filter((task) => (task.priority || "medium") === priority);
};

export const getTaskCountByPriority = (tasks) => {
  return tasks.reduce(
    (counts, task) => {
      const priority = task.priority || "medium";
      counts[priority] = (counts[priority] || 0) + 1;
      return counts;
    },
    { high: 0, medium: 0, low: 0 }
  );
};
