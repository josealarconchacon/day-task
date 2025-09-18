import React from "react";
import { EmptyState } from "./StyledTaskList.jsx";
import { TASK_FILTERS } from "../../constants/index.js";

const EmptyTaskState = ({
  filter,
  priorityFilter,
  categoryFilter,
  onPriorityFilterChange,
  onCategoryFilterChange,
}) => {
  const hasFilters = priorityFilter !== "all" || categoryFilter !== "all";

  const getEmptyMessage = () => {
    if (filter === TASK_FILTERS.COMPLETED) {
      return "Complete some tasks to see them here!";
    }
    if (hasFilters) {
      return "No tasks found with current filters. Try adjusting your filters.";
    }
    return "All tasks are completed! 🎉";
  };

  const getEmptyTitle = () => {
    const parts = ["No", filter];
    if (priorityFilter !== "all") parts.push(priorityFilter + " priority");
    if (categoryFilter !== "all") parts.push(categoryFilter + " category");
    parts.push("tasks");
    return parts.join(" ");
  };

  return (
    <EmptyState>
      <h3>{getEmptyTitle()}</h3>
      <p>{getEmptyMessage()}</p>

      {hasFilters && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {priorityFilter !== "all" && (
            <button
              onClick={() => onPriorityFilterChange("all")}
              style={{
                padding: "8px 16px",
                background: "#6c5ce7",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Show All Priorities
            </button>
          )}
          {categoryFilter !== "all" && (
            <button
              onClick={() => onCategoryFilterChange("all")}
              style={{
                padding: "8px 16px",
                background: "#6c5ce7",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Show All Categories
            </button>
          )}
        </div>
      )}
    </EmptyState>
  );
};

export default EmptyTaskState;
