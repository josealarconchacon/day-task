import React from "react";
import { Category } from "../Category/index.jsx";
import Priority from "../Priority/Priority.jsx";
import { TaskContent, TaskMeta, TaskText } from "./StyledTaskItem.jsx";

const TaskDisplay = ({ task }) => {
  return (
    <TaskContent>
      <TaskMeta>
        <TaskText $completed={task.completed}>{task.text}</TaskText>
        <Category
          category={task.category || "personal"}
          size="small"
          variant="default"
        />
        <Priority
          priority={task.priority || "medium"}
          size="small"
          variant="dot"
        />
      </TaskMeta>
    </TaskContent>
  );
};

export default TaskDisplay;
