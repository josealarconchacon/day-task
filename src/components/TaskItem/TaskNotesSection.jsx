import React from "react";
import Button from "../Button/Button.jsx";
import TaskNotes from "../TaskNotes/TaskNotes.jsx";
import { EditNotesSection } from "./StyledTaskItem.jsx";
import { LIMITS } from "../../constants/index.js";
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from "../../styles/designTokens.js";

const TaskNotesSection = ({
  task,
  editNotes,
  isEditing,
  isEditingNotes,
  showNotes,
  onNotesChange,
  onStartEditingNotes,
  onToggleNotes,
  onSaveNotes,
  onCancelNotesEdit,
}) => {
  return (
    <EditNotesSection>
      {/* notes preview */}
      {task.notes &&
        task.notes.trim() &&
        !isEditing &&
        !isEditingNotes &&
        !showNotes && (
          <div
            style={{
              fontSize: "12px",
              color: COLORS.textSecondary,
              marginBottom: "4px",
              padding: "8px 12px",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              border: "1px solid #e8eaed",
              lineHeight: "1.4",
            }}
          >
            <strong style={{ color: "#3c4043", fontWeight: "500" }}>
              Notes:
            </strong>{" "}
            {task.notes.length > LIMITS.NOTES_PREVIEW_LENGTH
              ? task.notes.substring(0, LIMITS.NOTES_PREVIEW_LENGTH) + "..."
              : task.notes}
          </div>
        )}

      {/* full notes display */}
      {showNotes &&
        task.notes &&
        task.notes.trim() &&
        !isEditing &&
        !isEditingNotes && (
          <div
            style={{
              fontSize: "12px",
              color: COLORS.textSecondary,
              marginBottom: "4px",
              padding: "8px 12px",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              border: "1px solid #e8eaed",
              lineHeight: "1.4",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong style={{ color: "#3c4043", fontWeight: "500" }}>
              Notes:
            </strong>{" "}
            {task.notes}
          </div>
        )}

      {/* notes editor */}
      {!isEditingNotes ? (
        <TaskNotes
          notes={isEditing || isEditingNotes ? editNotes : task.notes || ""}
          onNotesChange={onNotesChange}
          isEditing={isEditing || isEditingNotes}
          placeholder="Add notes..."
          variant="compact"
          showToggle={false}
        />
      ) : (
        <div
          style={{
            marginTop: "12px",
            padding: "16px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "2px solid #1a73e8",
            boxShadow: "0 2px 8px rgba(26, 115, 232, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: FONT_SIZES.md,
              color: "#1a73e8",
              fontWeight: FONT_WEIGHTS.medium,
              marginBottom: "4px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>✏️</span>
            Editing Notes
          </div>
          <textarea
            value={editNotes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Type your notes here..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "12px",
              border: "1px solid #dadce0",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "inherit",
              lineHeight: "1.5",
              resize: "vertical",
              backgroundColor: "#fafafa",
              color: "#202124",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1a73e8";
              e.target.style.backgroundColor = "#ffffff";
              e.target.style.boxShadow = "0 0 0 2px rgba(26, 115, 232, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#dadce0";
              e.target.style.backgroundColor = "#fafafa";
              e.target.style.boxShadow = "none";
            }}
            autoFocus
          />
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              size="small"
              onClick={onCancelNotesEdit}
            >
              Cancel
            </Button>
            <Button variant="primary" size="small" onClick={onSaveNotes}>
              Save Notes
            </Button>
          </div>
        </div>
      )}

      {/* notes actions */}
      {!isEditing && !isEditingNotes && task.notes && task.notes.trim() && (
        <div
          style={{
            marginTop: "4px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              color: COLORS.textSecondary,
              fontSize: FONT_SIZES.md,
              cursor: "pointer",
              padding: "4px 0",
              textDecoration: "none",
              fontWeight: FONT_WEIGHTS.medium,
            }}
            onClick={onToggleNotes}
          >
            {showNotes ? "Hide Notes" : "View Notes"}
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: COLORS.textSecondary,
              fontSize: FONT_SIZES.md,
              cursor: "pointer",
              padding: "4px 0",
              textDecoration: "none",
              fontWeight: FONT_WEIGHTS.medium,
            }}
            onClick={onStartEditingNotes}
          >
            Edit Notes
          </button>
        </div>
      )}

      {/* Add notes button when no notes exist */}
      {!isEditing && !isEditingNotes && (!task.notes || !task.notes.trim()) && (
        <div
          style={{
            marginTop: "4px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="secondary"
            size="small"
            onClick={onStartEditingNotes}
          >
            Add Notes
          </Button>
        </div>
      )}
    </EditNotesSection>
  );
};

export default TaskNotesSection;
