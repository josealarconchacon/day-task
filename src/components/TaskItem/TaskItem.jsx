import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import Priority, { PrioritySelector } from "../Priority/index.jsx";
import { Category, CategorySelector } from "../Category/index.jsx";
import TaskNotes from "../TaskNotes/TaskNotes.jsx";
import { useTasks } from "../../hooks/useTasks";
import {
  TaskContainer,
  TaskHeader,
  Checkbox,
  TaskText,
  TaskActions,
  EditInput,
  TaskContent,
  EditSection,
  EditInputRow,
  TaskDetails,
  TaskMainContent,
  TaskMeta,
  EditNotesSection,
} from "./StyledTaskItem.jsx";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || "medium");
  const [editCategory, setEditCategory] = useState(task.category || "personal");
  const [editNotes, setEditNotes] = useState(task.notes || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { toggleTask, deleteTask, editTask } = useTasks();

  const handleEdit = () => {
    if (editText.trim()) {
      editTask(task.id, editText, editPriority, editCategory, editNotes);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setEditPriority(task.priority || "medium");
    setEditCategory(task.category || "personal");
    setEditNotes(task.notes || "");
    setIsEditing(false);
  };

  const handleNotesEdit = () => {
    if (editNotes.trim() !== (task.notes || "").trim()) {
      editTask(
        task.id,
        task.text,
        task.priority || "medium",
        task.category || "personal",
        editNotes
      );
    }
    setIsEditingNotes(false);
  };

  const handleCancelNotesEdit = () => {
    setEditNotes(task.notes || "");
    setIsEditingNotes(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleEdit();
    else if (e.key === "Escape") handleCancelEdit();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <TaskContainer $priority={task.priority || "medium"}>
        <TaskHeader>
          <Checkbox
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />

          <TaskDetails>
            {isEditing ? (
              <EditSection>
                <EditInputRow>
                  <EditInput
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Task text..."
                    autoFocus
                  />
                </EditInputRow>
                <EditInputRow>
                  <PrioritySelector
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  />
                  <CategorySelector
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                </EditInputRow>
              </EditSection>
            ) : (
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
            )}
          </TaskDetails>
        </TaskHeader>

        {/* Notes Section */}
        <EditNotesSection>
          {/* Show notes preview if they exist */}
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
              {task.notes.length > 50
                ? task.notes.substring(0, 50) + "..."
                : task.notes}
            </div>
          )}

          <TaskNotes
            notes={isEditing || isEditingNotes ? editNotes : task.notes || ""}
            onNotesChange={setEditNotes}
            isEditing={isEditing || isEditingNotes}
            placeholder="Add notes for this task..."
            variant="compact"
          />
          {!isEditing && !isEditingNotes && (
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsEditingNotes(true)}
              style={{ marginTop: "4px" }}
            >
              {task.notes && task.notes.trim() ? "Edit Notes" : "Add Notes"}
            </Button>
          )}
          {isEditingNotes && (
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <Button variant="primary" size="small" onClick={handleNotesEdit}>
                Save Notes
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={handleCancelNotesEdit}
              >
                Cancel
              </Button>
            </div>
          )}
        </EditNotesSection>

        {}
        <TaskActions>
          {isEditing ? (
            <>
              <Button variant="primary" size="small" onClick={handleEdit}>
                Save
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setIsEditing(true)}
                disabled={task.completed}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            </>
          )}
        </TaskActions>
      </TaskContainer>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </>
  );
};

export default TaskItem;
