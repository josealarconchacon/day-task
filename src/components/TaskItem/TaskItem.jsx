import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import Priority, { PrioritySelector } from "../Priority/index.jsx";
import Category, { CategorySelector } from "../Category/index.jsx";
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
          <TaskNotes
            notes={isEditing ? editNotes : task.notes || ""}
            onNotesChange={setEditNotes}
            isEditing={isEditing}
            placeholder="Add notes for this task..."
            variant="compact"
          />
        </EditNotesSection>

        {/* Actions */}
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
