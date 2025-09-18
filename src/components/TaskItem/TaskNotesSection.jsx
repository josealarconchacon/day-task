import React from "react";
import Button from "../Button/Button.jsx";
import TaskNotes from "../TaskNotes/TaskNotes.jsx";
import { EditNotesSection } from "./StyledTaskItem.jsx";
import { LIMITS } from "../../constants/index.js";

const TaskNotesSection = ({
  task,
  editNotes,
  isEditing,
  isEditingNotes,
  onNotesChange,
  onStartEditingNotes,
  onSaveNotes,
  onCancelNotesEdit,
}) => {
  return (
    <EditNotesSection>
      {/* notes preview */}
      {task.notes && task.notes.trim() && !isEditing && !isEditingNotes && (
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            marginBottom: "4px",
            padding: "4px 8px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            borderLeft: "3px solid #6c5ce7",
          }}
        >
          <strong>Notes:</strong>{" "}
          {task.notes.length > LIMITS.NOTES_PREVIEW_LENGTH
            ? task.notes.substring(0, LIMITS.NOTES_PREVIEW_LENGTH) + "..."
            : task.notes}
        </div>
      )}

      {/* notes editor */}
      <TaskNotes
        notes={isEditing || isEditingNotes ? editNotes : task.notes || ""}
        onNotesChange={onNotesChange}
        isEditing={isEditing || isEditingNotes}
        placeholder="Add notes for this task..."
        variant="compact"
      />

      {/* notes actions */}
      {!isEditing && !isEditingNotes && (
        <Button
          variant="secondary"
          size="small"
          onClick={onStartEditingNotes}
          style={{ marginTop: "4px" }}
        >
          {task.notes && task.notes.trim() ? "Edit Notes" : "Add Notes"}
        </Button>
      )}

      {isEditingNotes && (
        <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
          <Button variant="primary" size="small" onClick={onSaveNotes}>
            Save Notes
          </Button>
          <Button variant="secondary" size="small" onClick={onCancelNotesEdit}>
            Cancel
          </Button>
        </div>
      )}
    </EditNotesSection>
  );
};

export default TaskNotesSection;
