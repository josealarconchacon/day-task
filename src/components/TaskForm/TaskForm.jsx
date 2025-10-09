import React, { useState, useCallback } from "react";
import Button from "../Button/Button.jsx";
import { useTasks } from "../../hooks/useTasks";
import { PrioritySelector } from "../Priority/index.jsx";
import { CategorySelector } from "../Category/index.jsx";
import TaskNotes from "../TaskNotes/TaskNotes.jsx";
import { DEFAULT_VALUES } from "../../constants/index.js";
import {
  Form,
  Input,
  FormRow,
  Label,
  FormSection,
  InlineNotesContainer,
  MobileNotesContainer,
  DesktopFormRow,
  MobileFormContainer,
  MobileInputRow,
  MobileControlsRow,
} from "./StyledTaskForm.jsx";

const TaskForm = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState(DEFAULT_VALUES.PRIORITY);
  const [category, setCategory] = useState(DEFAULT_VALUES.CATEGORY);
  const [notes, setNotes] = useState(DEFAULT_VALUES.NOTES);
  const { addTask } = useTasks();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (taskText.trim()) {
        addTask(taskText, priority, category, notes);
        setTaskText("");
        setPriority(DEFAULT_VALUES.PRIORITY);
        setCategory(DEFAULT_VALUES.CATEGORY);
        setNotes(DEFAULT_VALUES.NOTES);
      }
    },
    [taskText, priority, category, notes, addTask]
  );

  const handleTaskTextChange = useCallback((e) => {
    setTaskText(e.target.value);
  }, []);

  const handlePriorityChange = useCallback((e) => {
    setPriority(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const handleNotesChange = useCallback((newNotes) => {
    setNotes(newNotes);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormSection>
        {/* Desktop Layout */}
        <DesktopFormRow>
          <Input
            type="text"
            value={taskText}
            onChange={handleTaskTextChange}
            placeholder="What needs to be done?"
            aria-label="Task description"
          />
          <PrioritySelector
            id="priority-select"
            value={priority}
            onChange={handlePriorityChange}
            required={false}
            aria-label="Task priority"
          />
          <CategorySelector
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            required={false}
            aria-label="Task category"
          />
          <Button type="submit" disabled={!taskText.trim()}>
            Add
          </Button>
        </DesktopFormRow>

        {/* Mobile Layout */}
        <MobileFormContainer>
          <MobileInputRow>
            <Input
              type="text"
              value={taskText}
              onChange={handleTaskTextChange}
              placeholder="What needs to be done?"
              aria-label="Task description"
            />
          </MobileInputRow>

          <MobileNotesContainer>
            <TaskNotes
              notes={notes}
              onNotesChange={handleNotesChange}
              isEditing={true}
              placeholder="Add notes (optional)..."
              variant="minimal"
            />
          </MobileNotesContainer>

          <MobileControlsRow>
            <PrioritySelector
              id="priority-select-mobile"
              value={priority}
              onChange={handlePriorityChange}
              required={false}
              aria-label="Task priority"
            />
            <CategorySelector
              id="category-select-mobile"
              value={category}
              onChange={handleCategoryChange}
              required={false}
              aria-label="Task category"
            />
            <Button type="submit" disabled={!taskText.trim()}>
              Add
            </Button>
          </MobileControlsRow>
        </MobileFormContainer>

        <InlineNotesContainer>
          <TaskNotes
            notes={notes}
            onNotesChange={handleNotesChange}
            isEditing={true}
            placeholder="Add notes (optional)..."
            variant="minimal"
          />
        </InlineNotesContainer>
      </FormSection>
    </Form>
  );
};

export default TaskForm;
