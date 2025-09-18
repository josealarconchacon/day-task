import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import { useTasks } from "../../hooks/useTasks";
import { PrioritySelector } from "../Priority/index.jsx";
import { Form, Input, FormRow, Label } from "./StyledTaskForm.jsx";

const TaskForm = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, priority);
      setTaskText("");
      setPriority("medium");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="Task description"
        />
        <PrioritySelector
          id="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required={false}
          aria-label="Task priority"
        />
        <Button type="submit" disabled={!taskText.trim()}>
          Add
        </Button>
      </FormRow>
    </Form>
  );
};

export default TaskForm;
