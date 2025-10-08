import { Category } from "../Category/index.jsx";
import Priority from "../Priority/Priority.jsx";
import { TaskContent, TaskMeta, TaskText } from "./StyledTaskItem.jsx";

const TaskDisplay = ({ task }) => {
  return (
    <TaskContent>
      <TaskText $completed={task.completed}>
        <span>{task.text}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
        </div>
      </TaskText>
    </TaskContent>
  );
};

export default TaskDisplay;
