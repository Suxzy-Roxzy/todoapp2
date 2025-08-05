import React from "react";
import { Todo } from "../types/todo";

type TodoProps = {
  todo: Todo
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>,
  isediting: boolean,
  setIsediting: React.Dispatch<React.SetStateAction<boolean>>,
  currenttodo: Todo,
  setCurrenttodo: React.Dispatch<React.SetStateAction<Todo>>,
}

const TodoComponent = ({
  todo,
  isediting,
  setIsediting,
  setCurrenttodo,
  setTodolist,
}:TodoProps ) => {
  return (
    <div className="my-3 w-[700px] mx-auto bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-500">{todo.title}</h2>
          <p className="text-lg">{todo.description}</p>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <label className="text-gray-700">Mark as completed</label>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => {
            setIsediting(true);
            setCurrenttodo({
              id: todo.id,
              title: todo.title,
              description: todo.description,
              completed: todo.completed,
              createDate: todo.createDate,
            });
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
          disabled={isediting}
          onClick={() => {
            setIsediting(false)
            setTodolist((prevTodos) => {
             return prevTodos.filter((s) => s.id !== todo.id);
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoComponent;
