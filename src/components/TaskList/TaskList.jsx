import React, { useState, useMemo, useCallback } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../TaskItem/TaskItem.jsx";
import Priority from "../Priority/Priority.jsx";
import { Category } from "../Category/index.jsx";
import { sortTasksByPriority } from "../../utils/priorityUtils.js";
import { getCategoryOptions } from "../../utils/categoryUtils.js";
import { TASK_FILTERS } from "../../constants/index.js";
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
  const [filter, setFilter] = useState(TASK_FILTERS.ALL);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Memoize filtered and sorted tasks to prevent unnecessary recalculations
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      // filter by completion status
      if (filter === TASK_FILTERS.ACTIVE) return !task.completed;
      if (filter === TASK_FILTERS.COMPLETED) return task.completed;
      return true;
    });

    // filter by priority if selected
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (task) => (task.priority || "medium") === priorityFilter
      );
    }

    // filter by category if selected
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (task) => (task.category || "personal") === categoryFilter
      );
    }

    // sort by priority if enabled
    if (sortByPriority) {
      return sortTasksByPriority(filtered);
    }

    return filtered;
  }, [tasks, filter, priorityFilter, categoryFilter, sortByPriority]);

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      high: tasks.filter((t) => (t.priority || "medium") === "high").length,
      medium: tasks.filter((t) => (t.priority || "medium") === "medium").length,
      low: tasks.filter((t) => (t.priority || "medium") === "low").length,
    }),
    [tasks]
  );

  const categoryOptions = useMemo(() => getCategoryOptions(), []);

  // filter handlers to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handlePriorityFilterChange = useCallback((newPriorityFilter) => {
    setPriorityFilter(newPriorityFilter);
  }, []);

  const handleCategoryFilterChange = useCallback((newCategoryFilter) => {
    setCategoryFilter(newCategoryFilter);
  }, []);

  const handleSortToggle = useCallback((checked) => {
    setSortByPriority(checked);
  }, []);

  const handleAdvancedFiltersToggle = useCallback(() => {
    setShowAdvancedFilters((prev) => !prev);
  }, []);

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
      {}
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
          $active={filter === TASK_FILTERS.ALL}
          onClick={() => handleFilterChange(TASK_FILTERS.ALL)}
        >
          All ({taskCounts.all})
        </FilterButton>
        <FilterButton
          $active={filter === TASK_FILTERS.ACTIVE}
          onClick={() => handleFilterChange(TASK_FILTERS.ACTIVE)}
        >
          Active ({taskCounts.active})
        </FilterButton>
        <FilterButton
          $active={filter === TASK_FILTERS.COMPLETED}
          onClick={() => handleFilterChange(TASK_FILTERS.COMPLETED)}
        >
          Completed ({taskCounts.completed})
        </FilterButton>

        {}
        <FilterButton
          $active={showAdvancedFilters}
          onClick={handleAdvancedFiltersToggle}
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
              onClick={() => handlePriorityFilterChange("all")}
            >
              All Priorities
            </FilterButton>
            <FilterButton
              $active={priorityFilter === "high"}
              onClick={() => handlePriorityFilterChange("high")}
              aria-label="Filter by high priority tasks"
            >
              <Priority priority="high" size="small" variant="dot" />
              High ({taskCounts.high})
            </FilterButton>
            <FilterButton
              $active={priorityFilter === "medium"}
              onClick={() => handlePriorityFilterChange("medium")}
              aria-label="Filter by medium priority tasks"
            >
              <Priority priority="medium" size="small" variant="dot" />
              Medium ({taskCounts.medium})
            </FilterButton>
            <FilterButton
              $active={priorityFilter === "low"}
              onClick={() => handlePriorityFilterChange("low")}
              aria-label="Filter by low priority tasks"
            >
              <Priority priority="low" size="small" variant="dot" />
              Low ({taskCounts.low})
            </FilterButton>
          </FilterContainer>

          {}
          <FilterContainer>
            <FilterButton
              $active={categoryFilter === "all"}
              onClick={() => handleCategoryFilterChange("all")}
            >
              All Categories
            </FilterButton>
            {categoryOptions.map((option) => {
              const count = tasks.filter(
                (t) => (t.category || "personal") === option.value
              ).length;
              return (
                <FilterButton
                  key={option.value}
                  $active={categoryFilter === option.value}
                  onClick={() => handleCategoryFilterChange(option.value)}
                  aria-label={`Filter by ${option.label} category tasks`}
                >
                  <Category
                    category={option.value}
                    size="small"
                    variant="default"
                  />
                  ({count})
                </FilterButton>
              );
            })}
          </FilterContainer>

          <SortContainer role="group" aria-labelledby="sort-options">
            <SortLabel htmlFor="sort-priority">
              <input
                id="sort-priority"
                type="checkbox"
                checked={sortByPriority}
                onChange={(e) => handleSortToggle(e.target.checked)}
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
                  onClick={() => handlePriorityFilterChange("all")}
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
                  onClick={() => handleCategoryFilterChange("all")}
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
