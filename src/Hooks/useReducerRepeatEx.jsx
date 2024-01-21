import { useReducer, useState } from "react";
import Todo_ from "./components/Todo_";

export const actions = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODOD: "delete-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case actions.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];

    case actions.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

    case actions.DELETE_TODOD:
      return todos.filter((todo) => todo.id !== action.payload.id);
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, completed: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Wanna Value");
      return;
    }
    dispatch({ type: actions.ADD_TODO, payload: { name: name } });
    setName("");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        return <Todo_ key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default App;
