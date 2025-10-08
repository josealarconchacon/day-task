import React, { useState, useCallback } from "react";
import Modal from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import TaskDisplay from "./TaskDisplay.jsx";
import TaskEditor from "./TaskEditor.jsx";
import TaskActions from "./TaskActions.jsx";
import TaskNotesSection from "./TaskNotesSection.jsx";
import { useTasks } from "../../hooks/useTasks";
import { DEFAULT_VALUES } from "../../constants/index.js";
import {
  TaskContainer,
  TaskHeader,
  Checkbox,
  TaskDetails,
} from "./StyledTaskItem.jsx";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(
    task.priority || DEFAULT_VALUES.PRIORITY
  );
  const [editCategory, setEditCategory] = useState(
    task.category || DEFAULT_VALUES.CATEGORY
  );
  const [editNotes, setEditNotes] = useState(
    task.notes || DEFAULT_VALUES.NOTES
  );
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { toggleTask, deleteTask, editTask } = useTasks();

  const handleEdit = useCallback(() => {
    if (editText.trim()) {
      editTask(task.id, editText, editPriority, editCategory, editNotes);
      setIsEditing(false);
    }
  }, [task.id, editText, editPriority, editCategory, editNotes, editTask]);

  const handleCancelEdit = useCallback(() => {
    setEditText(task.text);
    setEditPriority(task.priority || DEFAULT_VALUES.PRIORITY);
    setEditCategory(task.category || DEFAULT_VALUES.CATEGORY);
    setEditNotes(task.notes || DEFAULT_VALUES.NOTES);
    setIsEditing(false);
  }, [task.text, task.priority, task.category, task.notes]);

  const handleNotesEdit = useCallback(() => {
    if (editNotes.trim() !== (task.notes || "").trim()) {
      editTask(
        task.id,
        task.text,
        task.priority || DEFAULT_VALUES.PRIORITY,
        task.category || DEFAULT_VALUES.CATEGORY,
        editNotes
      );
    }
    setIsEditingNotes(false);
  }, [
    task.id,
    task.text,
    task.priority,
    task.category,
    task.notes,
    editNotes,
    editTask,
  ]);

  const handleCancelNotesEdit = useCallback(() => {
    setEditNotes(task.notes || DEFAULT_VALUES.NOTES);
    setIsEditingNotes(false);
  }, [task.notes]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") handleEdit();
      else if (e.key === "Escape") handleCancelEdit();
    },
    [handleEdit, handleCancelEdit]
  );

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  }, [task.id, deleteTask]);

  const handleToggleTask = useCallback(() => {
    toggleTask(task.id);
  }, [task.id, toggleTask]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleStartEditingNotes = useCallback(() => {
    setIsEditingNotes(true);
  }, []);

  const handleToggleNotes = useCallback(() => {
    setShowNotes(!showNotes);
  }, [showNotes]);

  const handleShowDeleteModal = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleTextChange = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const handlePriorityChange = useCallback((e) => {
    setEditPriority(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setEditCategory(e.target.value);
  }, []);

  const handleNotesChange = useCallback((newNotes) => {
    setEditNotes(newNotes);
  }, []);

  return (
    <>
      <TaskContainer
        $priority={task.priority || DEFAULT_VALUES.PRIORITY}
        className="task-item"
      >
        <TaskHeader>
          <Checkbox
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleTask}
          />

          <TaskDetails>
            {isEditing ? (
              <TaskEditor
                editText={editText}
                editPriority={editPriority}
                editCategory={editCategory}
                onTextChange={handleTextChange}
                onPriorityChange={handlePriorityChange}
                onCategoryChange={handleCategoryChange}
                onKeyDown={handleKeyPress}
              />
            ) : (
              <TaskDisplay task={task} />
            )}
          </TaskDetails>
        </TaskHeader>

        <TaskNotesSection
          task={task}
          editNotes={editNotes}
          isEditing={isEditing}
          isEditingNotes={isEditingNotes}
          showNotes={showNotes}
          onNotesChange={handleNotesChange}
          onStartEditingNotes={handleStartEditingNotes}
          onToggleNotes={handleToggleNotes}
          onSaveNotes={handleNotesEdit}
          onCancelNotesEdit={handleCancelNotesEdit}
        />

        <TaskActions
          isEditing={isEditing}
          isCompleted={task.completed}
          onEdit={handleStartEdit}
          onSave={handleEdit}
          onCancel={handleCancelEdit}
          onDelete={handleShowDeleteModal}
        />
      </TaskContainer>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Confirm Delete"
        actions={
          <>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
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
