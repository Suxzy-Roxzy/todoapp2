import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "../types";
import toast, { Toast } from "react-hot-toast";

type TodoProps = {
  todo: Todo;
  setTodolist: Dispatch<SetStateAction<Todo[]>>;
  isediting: boolean;
  setIsediting: Dispatch<SetStateAction<boolean>>;
  currenttodo: Todo;
  setCurrenttodo: Dispatch<SetStateAction<Todo>>;
  handleMarkasCompleted: (id: string) => void;
};

const TodoComponent = ({
  todo,
  isediting,
  setIsediting,
  setCurrenttodo,
  setTodolist,
  handleMarkasCompleted,
}: TodoProps) => {
  return (
    <div className="my-3 w-[700px] mx-auto bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h2
            className={`text-2xl font-bold ${
              todo.completed ? "text-gray-600" : "text-blue-500"
            } `}
          >
            {todo.title}
          </h2>
          <p
            className={`text-lg ${
              todo.completed ? "text-gray-600" : "text-black"
            } font-black`}
          >
            {todo.description}
          </p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleMarkasCompleted(todo.id)}
          />
          <label className="text-gray-700">Mark as completed</label>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          className={`${
            todo.completed
              ? "text-gray-500 bg-gray-700"
              : "text-white bg-blue-500"
          } px-4 py-2 rounded mt-2`}
          onClick={() => {
            setIsediting(true);
            setCurrenttodo(todo);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 px-4 py-2 rounded mt-2 ml-2"
          disabled={isediting}
          onClick={() => {
            setIsediting(false);
            setTodolist((prevTodos) => {
              return prevTodos.filter((s) => s.id !== todo.id);
            });
            toast.success("Your Todo has been successfully deleted!");
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoComponent;
