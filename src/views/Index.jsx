import React, { useState, useEffect, useReducer } from "react";
import todoReducer from "../reducers/todo";
import InputText from "../componentsOld/inputs/Text";

const asRemove = (id) =>
  new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        resolve();
      });
  });

const asAdd = (title) =>
  new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });

export default function Index() {
  const [task, setTask] = useState("");
  const [todos, todoDispatch] = useReducer(todoReducer, []);

  function handleInputChange(val) {
    setTask(val);
  }

  async function addTodo(e) {
    e.preventDefault();
    setTask("");
    const taskId = await asAdd(task);
    todoDispatch({
      type: "ADD_TODO",
      payload: { id: taskId, title: task },
    });
  }

  async function removeTodo(id) {
    await asRemove(id);
    todoDispatch({ type: "REMOVE_TODO", payload: id });
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5")
      .then((res) => res.json())
      .then((data) => {
        todoDispatch({ type: "LOAD_TODOS", payload: data });
      });
  }, []);

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
