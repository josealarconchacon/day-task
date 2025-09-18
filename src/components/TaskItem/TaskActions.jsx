import React from "react";
import Button from "../Button/Button.jsx";
import { TaskActions as StyledTaskActions } from "./StyledTaskItem.jsx";

const TaskActions = ({
  isEditing,
  isCompleted,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <StyledTaskActions>
      {isEditing ? (
        <>
          <Button variant="primary" size="small" onClick={onSave}>
            Save
          </Button>
          <Button variant="secondary" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="secondary"
            size="small"
            onClick={onEdit}
            disabled={isCompleted}
          >
            Edit
          </Button>
          <Button variant="danger" size="small" onClick={onDelete}>
            Delete
          </Button>
        </>
      )}
    </StyledTaskActions>
  );
};

export default TaskActions;
