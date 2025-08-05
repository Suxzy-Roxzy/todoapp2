import React from "react";
import { Todo } from "../types/todo";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { todo } from "node:test";


type TodoProps = {
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>,
  isediting: Boolean,
  setIsediting: React.Dispatch<React.SetStateAction<boolean>>,
  currenttodo: Todo,
  setCurrenttodo: React.Dispatch<React.SetStateAction<Todo>>,
}

const TodoForm = ({
  setTodolist,
  isediting,
  setIsediting,
  currenttodo,
  setCurrenttodo,
}:TodoProps ) => {
  // Reset All States when a Function is fufilled
  const resetStates = () => {
    setIsediting(false);
    setCurrenttodo({
      id : "",
      title: "",
      description: "",
      completed: false,
      createDate: new Date().toISOString(),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isediting) {
      // Update the Todo list
      setTodolist((prevTodos) =>
        prevTodos.map((todo) => {
         return todo.id === currenttodo.id ? currenttodo : todo;
        })
      );
    } else {
      // Add item
      const newTodo: Todo = {
        id: uuidv4(),
        title: currenttodo.title,
        description: currenttodo.description,
        completed: false,
        createDate: new Date().toISOString(),
      };
      setTodolist((prevTodos) => [newTodo, ...prevTodos]);
    }
    // Resets all states
    resetStates();
    // Pops up completed messages
    toast.success(
      isediting
        ? "You Todo has been successfully updated"
        : "Your Task has been successfully added!"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Task Title
        </label>
        <input
          value={currenttodo.title}
          onChange={(e) =>
            setCurrenttodo({
              ...currenttodo,
              title: e.target.value,
            })
          }
          type="text"
          name="title"
          id="title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Task Description
        </label>
        <textarea
          value={currenttodo.description}
          onChange={(e) =>
            setCurrenttodo({
              ...currenttodo,
              description: e.target.value,
            })
          }
          name="description"
          id="description"
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
