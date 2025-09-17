import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskItem from "../TaskItem/TaskItem.jsx";
import {
  List,
  EmptyState,
  FilterContainer,
  FilterButton,
} from "./StyledTaskList.jsx";

const TaskList = () => {
  const { tasks, isLoading } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

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
      </FilterContainer>

      <List>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>

      {filteredTasks.length === 0 && (
        <EmptyState>
          <h3>No {filter} tasks</h3>
          <p>
            {filter === "completed"
              ? "Complete some tasks to see them here!"
              : "All tasks are completed!"}
          </p>
        </EmptyState>
      )}
    </div>
  );
};

export default TaskList;
