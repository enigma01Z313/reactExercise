import React, { useState, useEffect, useReducer } from "react";
import todoReducer from "../reducers/todo";
import InputText from "../componentsOld/inputs/Text";

export default function Index() {
  const [task, setTask] = useState("");
  const [todos, todoDispatch] = useReducer(todoReducer, []);

  function handleInputChange(val) {
    setTask(val);
  }

  function addTodo(e) {
    e.preventDefault();
    todoDispatch({ type: "ADD_TODO", payload: task });
    setTask("");
  }

  function removeTodo(id) {
    todoDispatch({ type: "REMOVE_TODO", payload: id });
  }

  useEffect(() => {
    console.log("mounted");
    fetch("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5")
      .then((res) => res.json())
      .then((data) => {
        todoDispatch({ type: "LOAD_TODOS", payload: data });
      });
  }, []);

  console.log(todos);
  return (
    <>
      <form onSubmit={addTodo}>
        <InputText value={task} changeValue={handleInputChange} />
        <button>Submit</button>
      </form>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} <button onClick={() => removeTodo(todo.id)}>x</button>
          </li>
        ))}
      </ol>
    </>
  );
}
