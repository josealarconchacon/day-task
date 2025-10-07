import React, { useState, useEffect } from "react";
import Button from "../Button/Button.jsx";
import {
  NotesContainer,
  NotesToggle,
  NotesTextarea,
  NotesActions,
  NotesIcon,
  NotesLabel,
  NotesDisplay,
} from "./StyledTaskNotes.jsx";

const TaskNotes = ({
  notes = "",
  onNotesChange,
  isEditing = false,
  placeholder = "Add detailed notes or description...",
  variant = "default",
  showToggle = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(isEditing);
  const [localNotes, setLocalNotes] = useState(notes);

  // update expanded when isEditing changes
  useEffect(() => {
    setIsExpanded(isEditing);
  }, [isEditing]);

  // update local notes when notes changes
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  // update local notes when switching to editing mode
  useEffect(() => {
    if (isEditing) {
      setLocalNotes(notes);
    }
  }, [isEditing, notes]);

  const handleSave = () => {
    if (onNotesChange) {
      onNotesChange(localNotes);
    }
    if (!isEditing) {
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setLocalNotes(notes);
    if (!isEditing) {
      setIsExpanded(false);
    }
  };

  const handleToggle = () => {
    if (!isExpanded) {
      setLocalNotes(notes);
    }
    setIsExpanded(!isExpanded);
  };

  const hasNotes = notes && notes.trim().length > 0;

  if (isEditing) {
    if (variant === "minimal") {
      return (
        <NotesContainer $minimal={true}>
          <NotesTextarea
            value={localNotes}
            onChange={(e) => {
              setLocalNotes(e.target.value);
              // immediately update parent state
              if (onNotesChange) {
                onNotesChange(e.target.value);
              }
            }}
            placeholder={placeholder}
            rows="1"
            maxLength="500"
            $minimal={true}
          />
        </NotesContainer>
      );
    }

    return (
      <NotesContainer>
        <NotesTextarea
          value={localNotes}
          onChange={(e) => {
            setLocalNotes(e.target.value);
            // In editing mode, immediately update parent state
            if (onNotesChange) {
              onNotesChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          rows="3"
          maxLength="500"
        />
        <NotesActions>
          <Button variant="primary" size="small" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </NotesActions>
      </NotesContainer>
    );
  }

  return (
    <NotesContainer>
      {showToggle && (
        <NotesToggle
          onClick={handleToggle}
          $hasNotes={hasNotes}
          $compact={variant === "compact"}
        >
          <NotesIcon $hasNotes={hasNotes} $compact={variant === "compact"}>
            📝
          </NotesIcon>
          <NotesLabel $hasNotes={hasNotes} $compact={variant === "compact"}>
            {hasNotes ? "View Notes" : "Add Notes"}
          </NotesLabel>
        </NotesToggle>
      )}

      {isExpanded && (
        <NotesDisplay $compact={variant === "compact"}>
          {hasNotes ? notes : "No notes added yet."}
        </NotesDisplay>
      )}
    </NotesContainer>
  );
};

export default TaskNotes;
