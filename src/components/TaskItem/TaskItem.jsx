import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import { useTasks } from "../../hooks/useTasks";
import {
  TaskContainer,
  Checkbox,
  TaskText,
  TaskActions,
  EditInput,
} from "./StyledTaskItem.jsx";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { toggleTask, deleteTask, editTask } = useTasks();

  const handleEdit = () => {
    if (editText.trim()) {
      editTask(task.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
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
      <TaskContainer>
        <Checkbox
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        {isEditing ? (
          <EditInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <TaskText $completed={task.completed}>{task.text}</TaskText>
        )}

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
