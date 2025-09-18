import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../TaskItem/TaskItem.jsx";
import Priority from "../Priority/Priority.jsx";
import { sortTasksByPriority } from "../../utils/priorityUtils.js";
import {
  List,
  EmptyState,
  FilterContainer,
  FilterButton,
  SortContainer,
  SortLabel,
} from "./StyledTaskList.jsx";

const TaskList = () => {
  const { tasks, isLoading } = useTasks();
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  let filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Filter by priority if selected
  if (priorityFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => (task.priority || "medium") === priorityFilter
    );
  }

  // Sort by priority if enabled
  if (sortByPriority) {
    filteredTasks = sortTasksByPriority(filteredTasks);
  }

  // show loading state while tasks are being loaded from localStorage
  if (isLoading) {
    return (
      <EmptyState>
        <h3>Loading your tasks...</h3>
        <p>Please wait a moment</p>
      </EmptyState>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState>
        <h3>No tasks yet</h3>
        <p>Add a task to get started!</p>
      </EmptyState>
    );
  }

  return (
    <div>
      {/* Primary Filters - Always Visible */}
      <FilterContainer>
        <FilterButton
          $active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All ({tasks.length})
        </FilterButton>
        <FilterButton
          $active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          Active ({tasks.filter((t) => !t.completed).length})
        </FilterButton>
        <FilterButton
          $active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          Completed ({tasks.filter((t) => t.completed).length})
        </FilterButton>

        {/* Toggle Advanced Filters */}
        <FilterButton
          $active={showAdvancedFilters}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          style={{ marginLeft: "auto" }}
          aria-expanded={showAdvancedFilters}
          aria-label="Toggle advanced filters"
        >
          {showAdvancedFilters ? "Less" : "More"}
        </FilterButton>
      </FilterContainer>

      {/* Advanced Filters - Progressive Disclosure */}
      {showAdvancedFilters && (
        <>
          <FilterContainer>
            <FilterButton
              $active={priorityFilter === "all"}
              onClick={() => setPriorityFilter("all")}
            >
              All Priorities
            </FilterButton>
            <FilterButton
              $active={priorityFilter === "high"}
              onClick={() => setPriorityFilter("high")}
              aria-label="Filter by high priority tasks"
            >
              <Priority priority="high" size="small" variant="dot" />
              High (
              {tasks.filter((t) => (t.priority || "medium") === "high").length})
            </FilterButton>
            <FilterButton
              $active={priorityFilter === "medium"}
              onClick={() => setPriorityFilter("medium")}
              aria-label="Filter by medium priority tasks"
            >
              <Priority priority="medium" size="small" variant="dot" />
              Medium (
              {
                tasks.filter((t) => (t.priority || "medium") === "medium")
                  .length
              }
              )
            </FilterButton>
            <FilterButton
              $active={priorityFilter === "low"}
              onClick={() => setPriorityFilter("low")}
              aria-label="Filter by low priority tasks"
            >
              <Priority priority="low" size="small" variant="dot" />
              Low (
              {tasks.filter((t) => (t.priority || "medium") === "low").length})
            </FilterButton>
          </FilterContainer>

          <SortContainer role="group" aria-labelledby="sort-options">
            <SortLabel htmlFor="sort-priority">
              <input
                id="sort-priority"
                type="checkbox"
                checked={sortByPriority}
                onChange={(e) => setSortByPriority(e.target.checked)}
                aria-describedby="sort-description"
              />
              Sort by Priority
            </SortLabel>
            <div
              id="sort-description"
              style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}
            >
              {sortByPriority
                ? "Tasks sorted by priority (High → Medium → Low)"
                : "Tasks in default order"}
            </div>
          </SortContainer>
        </>
      )}

      <List>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>

      {filteredTasks.length === 0 && (
        <EmptyState>
          <h3>
            No {filter}{" "}
            {priorityFilter !== "all" ? priorityFilter + " priority" : ""} tasks
          </h3>
          <p>
            {filter === "completed"
              ? "Complete some tasks to see them here!"
              : priorityFilter !== "all"
              ? `No ${priorityFilter} priority tasks found. Try adjusting your filters.`
              : "All tasks are completed! 🎉"}
          </p>
          {priorityFilter !== "all" && (
            <button
              onClick={() => setPriorityFilter("all")}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                background: "#6c5ce7",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Show All Priorities
            </button>
          )}
        </EmptyState>
      )}
    </div>
  );
};

export default TaskList;
