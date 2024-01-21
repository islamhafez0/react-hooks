import React, { useReducer } from "react";

const ACTIONS = {
  ADD_TASK: "add_task",
  TOGGLE_COMPLETE: "toggle_complete",
  REMOVE_TASK: "remove_task",
};

const initialState = {
  tasks: [],
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };

    case ACTIONS.TOGGLE_COMPLETE:
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case ACTIONS.REMOVE_TASK:
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
};

const TaskList = ({ tasks, dispatch }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              dispatch({ type: ACTIONS.TOGGLE_COMPLETE, payload: task.id })
            }
          />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
          </span>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.REMOVE_TASK, payload: task.id })
            }
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

const TaskManager = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const handleAddTask = () => {
    const taskText = prompt("Enter a new task:");
    if (taskText) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: taskText });
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList tasks={state.tasks} dispatch={dispatch} />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskManager;
