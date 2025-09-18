import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../TaskItem/TaskItem.jsx";
import Priority from "../Priority/Priority.jsx";
import Category from "../Category/Category.jsx";
import { sortTasksByPriority } from "../../utils/priorityUtils.js";
import { getCategoryOptions } from "../../utils/categoryUtils.js";
import {
  List,
  EmptyState,
  FilterContainer,
  FilterButton,
  SortContainer,
  SortLabel,
} from "./StyledTaskList.jsx";

const TaskList = () => {
  const { tasks, isLoading, saveError } = useTasks();
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  let filteredTasks = tasks.filter((task) => {
    // filter by completion status
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // filter by priority if selected
  if (priorityFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => (task.priority || "medium") === priorityFilter
    );
  }

  // filter by category if selected
  if (categoryFilter !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => (task.category || "personal") === categoryFilter
    );
  }

  // sort by priority if enabled
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
      {/* Save Error Notification */}
      {saveError && (
        <div
          style={{
            padding: "8px 12px",
            marginBottom: "16px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            color: "#dc2626",
            fontSize: "14px",
          }}
        >
          ⚠️ {saveError}
        </div>
      )}
      {}
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

        {}
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

      {}
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

          {}
          <FilterContainer>
            <FilterButton
              $active={categoryFilter === "all"}
              onClick={() => setCategoryFilter("all")}
            >
              All Categories
            </FilterButton>
            {getCategoryOptions().map((option) => (
              <FilterButton
                key={option.value}
                $active={categoryFilter === option.value}
                onClick={() => setCategoryFilter(option.value)}
                aria-label={`Filter by ${option.label} category tasks`}
              >
                <Category
                  category={option.value}
                  size="small"
                  variant="default"
                />
                (
                {
                  tasks.filter(
                    (t) => (t.category || "personal") === option.value
                  ).length
                }
                )
              </FilterButton>
            ))}
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
            {priorityFilter !== "all" ? priorityFilter + " priority" : ""}{" "}
            {categoryFilter !== "all" ? categoryFilter + " category" : ""} tasks
          </h3>
          <p>
            {filter === "completed"
              ? "Complete some tasks to see them here!"
              : priorityFilter !== "all" || categoryFilter !== "all"
              ? `No tasks found with current filters. Try adjusting your filters.`
              : "All tasks are completed! 🎉"}
          </p>
          {(priorityFilter !== "all" || categoryFilter !== "all") && (
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
                  onClick={() => setPriorityFilter("all")}
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
                  onClick={() => setCategoryFilter("all")}
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
      )}
    </div>
  );
};

export default TaskList;
