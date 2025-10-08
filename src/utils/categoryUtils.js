// category configuration and utilities
export const CATEGORIES = {
  personal: {
    label: "Personal",
    color: "#6c5ce7",
    bgColor: "#f8f7ff",
    borderColor: "#e4e1ff",
    icon: "👤",
  },
  work: {
    label: "Work",
    color: "#00b894",
    bgColor: "#f1fffe",
    borderColor: "#c7f5f0",
    icon: "💼",
  },
  shopping: {
    label: "Shopping",
    color: "#e17055",
    bgColor: "#fff8f6",
    borderColor: "#fde2d8",
    icon: "🛒",
  },
  health: {
    label: "Health",
    color: "#fd79a8",
    bgColor: "#fff7fb",
    borderColor: "#fce4f0",
    icon: "🏥",
  },
  education: {
    label: "Education",
    color: "#fdcb6e",
    bgColor: "#fffbf2",
    borderColor: "#fef3d9",
    icon: "📚",
  },
  finance: {
    label: "Finance",
    color: "#00cec9",
    bgColor: "#f0fffe",
    borderColor: "#c7f7f5",
    icon: "💰",
  },
  home: {
    label: "Home",
    color: "#a29bfe",
    bgColor: "#f9f8ff",
    borderColor: "#e8e5ff",
    icon: "🏠",
  },
  travel: {
    label: "Travel",
    color: "#55a3ff",
    bgColor: "#f4f9ff",
    borderColor: "#d1e7ff",
    icon: "✈️",
  },
};

export const getCategoryConfig = (category) => {
  return CATEGORIES[category] || CATEGORIES.personal;
};

export const getCategoryOptions = () => {
  return Object.entries(CATEGORIES).map(([value, config]) => ({
    value,
    label: config.label,
    icon: config.icon,
  }));
};
