import React, { useState, useMemo, useCallback } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../TaskItem/TaskItem.jsx";
import FilterControls from "./FilterControls.jsx";
import AdvancedFilters from "./AdvancedFilters.jsx";
import EmptyTaskState from "./EmptyTaskState.jsx";
import SaveErrorNotification from "./SaveErrorNotification.jsx";
import { sortTasksByPriority } from "../../utils/priorityUtils.js";
import { getCategoryOptions } from "../../utils/categoryUtils.js";
import { TASK_FILTERS } from "../../constants/index.js";
import { List, EmptyState } from "./StyledTaskList.jsx";

const TaskList = () => {
  const { tasks, isLoading, saveError } = useTasks();
  const [filter, setFilter] = useState(TASK_FILTERS.ALL);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // filtered and sorted tasks to prevent unnecessary recalculations
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

  // show loading state while tasks are being loaded from Supabase
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
      <SaveErrorNotification saveError={saveError} />

      <FilterControls
        filter={filter}
        taskCounts={taskCounts}
        showAdvancedFilters={showAdvancedFilters}
        onFilterChange={handleFilterChange}
        onAdvancedFiltersToggle={handleAdvancedFiltersToggle}
      />

      {showAdvancedFilters && (
        <AdvancedFilters
          priorityFilter={priorityFilter}
          categoryFilter={categoryFilter}
          categoryOptions={categoryOptions}
          taskCounts={taskCounts}
          tasks={tasks}
          sortByPriority={sortByPriority}
          onPriorityFilterChange={handlePriorityFilterChange}
          onCategoryFilterChange={handleCategoryFilterChange}
          onSortToggle={handleSortToggle}
        />
      )}

      <List>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>

      {filteredTasks.length === 0 && (
        <EmptyTaskState
          filter={filter}
          priorityFilter={priorityFilter}
          categoryFilter={categoryFilter}
          onPriorityFilterChange={handlePriorityFilterChange}
          onCategoryFilterChange={handleCategoryFilterChange}
        />
      )}
    </div>
  );
};

export default TaskList;
