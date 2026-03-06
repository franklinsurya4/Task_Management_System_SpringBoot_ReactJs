import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

import "../Styles/TodoPage.css";

import { getTodos, addTodo, deleteTodo, toggleTodo } from "../Api/todoApi";

import { useTranslation } from "react-i18next";

function TodoPage({ darkMode }) {

  const { t } = useTranslation();

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    getTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };

  const handleAdd = () => {

    if (!task.trim()) return;

    const newTodo = {
      text: task,
      completed: false
    };

    addTodo(newTodo).then(() => {
      setTask("");
      loadTodos();
    });
  };

  const handleToggle = (id) => {
    toggleTodo(id).then(() => loadTodos());
  };

  const handleDelete = (id) => {
    deleteTodo(id).then(() => loadTodos());
  };

  return (

    <div className={`todo-container ${darkMode ? "dark" : ""}`}>

      <h2>
        <FontAwesomeIcon icon={faListCheck} style={{ marginRight: "8px" }} />
          {t("ToDo List")}
      </h2>

      <div className="todo-input">

        <input
          type="text"
          placeholder={t("Enter Task")}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAdd}>
          {t("Add")}
        </button>

      </div>

      <ul className="todo-list">

        {todos.map((todo) => (

          <li
            key={todo.id}
            className={todo.completed ? "completed" : ""}
            onClick={() => handleToggle(todo.id)}
          >

            {todo.text}

            <span
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
            >
              {t("Delete")}
            </span>

          </li>

        ))}

      </ul>

    </div>

  );
}

export default TodoPage;