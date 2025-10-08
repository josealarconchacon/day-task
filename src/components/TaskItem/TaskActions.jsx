import Button from "../Button/Button.jsx";
import { TaskActions as StyledTaskActions } from "./StyledTaskItem.jsx";
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from "../../styles/designTokens.js";

const TaskActions = ({
  isEditing,
  isCompleted,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <StyledTaskActions className="task-actions">
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
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: COLORS.textSecondary,
              fontSize: FONT_SIZES.md,
              cursor: isCompleted ? "not-allowed" : "pointer",
              padding: "4px 0",
              textDecoration: "underline",
              fontWeight: FONT_WEIGHTS.medium,
              opacity: isCompleted ? 0.5 : 1,
            }}
            onClick={onEdit}
            disabled={isCompleted}
          >
            Edit
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: COLORS.error,
              fontSize: FONT_SIZES.md,
              cursor: "pointer",
              padding: "4px 0",
              textDecoration: "underline",
              fontWeight: FONT_WEIGHTS.medium,
            }}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </StyledTaskActions>
  );
};

export default TaskActions;
