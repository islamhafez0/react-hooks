import React from 'react'
import { ACTIONS } from '../App'

const Todo = ({ todo, dispatch }) => {
  const styles = {
    color: todo.complete ? "#ccca" : "#000",
    textDecoration: todo.complete ? "line-throw" : "none",
    margin: "0 10px"
  }
  return (
    <div>
      <span style={styles}>{todo.name}</span>
      <button onClick={() => dispatch({ type: ACTIONS.TOGGLE, payload: {id: todo.id} })}>Togggle</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE, payload: {id: todo.id} })}>Delete</button>
    </div>
  )
}

export default Todo;