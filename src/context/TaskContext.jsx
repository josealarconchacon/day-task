import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

// set context to manage task globally
const TaskContext = createContext();

// handle state changes based on dispatch actions
const taskReducer = (state, action) => {
  switch (action.type) {
    // add task
    case "add_task":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uuidv4(), // generate unique id
            text: action.payload, // task text
            completed: false, // initial state
            createdAt: new Date().toISOString(), // timestamp
          },
        ],
      };
    // delete task
    case "delete_task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    // toggle task
    case "toggle_task":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    // edit task
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

// task list initial state
const initialState = {
  tasks: [],
};

// set context provider
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // helper function to add task
  const addTask = (text) => {
    dispatch({ type: "add_task", payload: text });
  };

  // helper function to delete task
  const deleteTask = (id) => {
    dispatch({ type: "delete_task", payload: id });
  };

  // helper function to toggle task
  const toggleTask = (id) => {
    dispatch({ type: "toggle_task", payload: id });
  };

  // helper function to edit task
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

// Custom hook for consuming the TaskContext
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    // Error if someone tries to use this hook outside TaskProvider
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
