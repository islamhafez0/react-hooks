import React, { useReducer, useState } from 'react'
import Todo from '../components/Todo'
export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE: "toggle",
  DELETE: "delete"
};

function reducer(todos, action) {
  switch(action.type) {
    case ACTIONS.ADD_TODO: 
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE: 
      return todos.map(todo => {
        if(todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })
      case ACTIONS.DELETE: 
        return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}

function newTodo(name) {
  return {id: Date.now(), complete: false, name: name}
}

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('');

  console.log(todos)

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: {name: name} })
    setName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </form>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  )
}

export default TodoApp