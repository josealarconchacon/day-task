import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import { useTasks } from "../../hooks/useTasks";
import { Form, Input } from "./StyledTaskForm.jsx";

const TaskForm = () => {
  const [taskText, setTaskText] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
      />
      <Button type="submit" disabled={!taskText.trim()}>
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
