import React from "react";
import Priority from "../Priority/Priority.jsx";
import { Category } from "../Category/index.jsx";
import {
  FilterContainer,
  FilterButton,
  SortContainer,
  SortLabel,
} from "./StyledTaskList.jsx";

const AdvancedFilters = ({
  priorityFilter,
  categoryFilter,
  categoryOptions,
  taskCounts,
  tasks,
  sortByPriority,
  onPriorityFilterChange,
  onCategoryFilterChange,
  onSortToggle,
}) => {
  return (
    <>
      {/* priority filters */}
      <FilterContainer>
        <FilterButton
          $active={priorityFilter === "all"}
          onClick={() => onPriorityFilterChange("all")}
        >
          All Priorities
        </FilterButton>
        <FilterButton
          $active={priorityFilter === "high"}
          onClick={() => onPriorityFilterChange("high")}
          aria-label="Filter by high priority tasks"
        >
          <Priority priority="high" size="small" variant="dot" />
          High ({taskCounts.high})
        </FilterButton>
        <FilterButton
          $active={priorityFilter === "medium"}
          onClick={() => onPriorityFilterChange("medium")}
          aria-label="Filter by medium priority tasks"
        >
          <Priority priority="medium" size="small" variant="dot" />
          Medium ({taskCounts.medium})
        </FilterButton>
        <FilterButton
          $active={priorityFilter === "low"}
          onClick={() => onPriorityFilterChange("low")}
          aria-label="Filter by low priority tasks"
        >
          <Priority priority="low" size="small" variant="dot" />
          Low ({taskCounts.low})
        </FilterButton>
      </FilterContainer>

      {/* category filters */}
      <FilterContainer>
        <FilterButton
          $active={categoryFilter === "all"}
          onClick={() => onCategoryFilterChange("all")}
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
              onClick={() => onCategoryFilterChange(option.value)}
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

      {/* sort */}
      <SortContainer role="group" aria-labelledby="sort-options">
        <SortLabel htmlFor="sort-priority">
          <input
            id="sort-priority"
            type="checkbox"
            checked={sortByPriority}
            onChange={(e) => onSortToggle(e.target.checked)}
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
  );
};

export default AdvancedFilters;
