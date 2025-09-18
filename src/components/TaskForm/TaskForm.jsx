import React, { useState } from "react";
import Button from "../Button/Button.jsx";
import { useTasks } from "../../hooks/useTasks";
import { PrioritySelector } from "../Priority/index.jsx";
import { CategorySelector } from "../Category/index.jsx";
import TaskNotes from "../TaskNotes/TaskNotes.jsx";
import { Form, Input, FormRow, Label, FormSection } from "./StyledTaskForm.jsx";

const TaskForm = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");
  const [notes, setNotes] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, priority, category, notes);
      setTaskText("");
      setPriority("medium");
      setCategory("personal");
      setNotes("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormSection>
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
          <CategorySelector
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required={false}
            aria-label="Task category"
          />
          <Button type="submit" disabled={!taskText.trim()}>
            Add
          </Button>
        </FormRow>
        <TaskNotes
          notes={notes}
          onNotesChange={setNotes}
          isEditing={true}
          placeholder="Add notes (optional)..."
          variant="minimal"
        />
      </FormSection>
    </Form>
  );
};

export default TaskForm;
