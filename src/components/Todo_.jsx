import React from "react";
import { actions } from "../App";

export default function Todo_({ todo, dispatch }) {
  return (
    <div style={{ color: todo.completed ? "#AAA" : "#000", marginTop: "10px" }}>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          width: "150px",
          display: "inline-block",
        }}
      >
        {todo.name}
      </span>
      <button
        onClick={() =>
          dispatch({ type: actions.TOGGLE_TODO, payload: { id: todo.id } })
        }
      >
        Toggle
      </button>
      <button
        onClick={() =>
          dispatch({ type: actions.DELETE_TODOD, payload: { id: todo.id } })
        }
      >
        Delete
      </button>
    </div>
  );
}
