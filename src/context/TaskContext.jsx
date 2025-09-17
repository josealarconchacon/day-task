import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "./TaskContext.js";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "add_task":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uuidv4(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case "delete_task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "toggle_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "edit_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, text: action.payload.newText }
            : task
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
};

// add, delete, toggle, and edit operations.
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (text) => {
    dispatch({ type: "add_task", payload: text });
  };

  const deleteTask = (id) => {
    dispatch({ type: "delete_task", payload: id });
  };

  const toggleTask = (id) => {
    dispatch({ type: "toggle_task", payload: id });
  };

  const editTask = (id, newText) => {
    dispatch({ type: "edit_task", payload: { id, newText } });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
