"use client";
import TodoComponent from "@/components/todo";
import TodoForm from "@/components/todoform";
import { useEffect, useState } from "react";
import { Todo } from "@/types";
import { ReactFormState } from "react-dom/client";

// const todos = [
//   {
//     id: 1,
//     title: "Learn Next.js",
//     description: "Understand the basics of Next.js",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Build a Todo App",
//     description: "Create a simple todo app using Next.js",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Deploy to Vercel",
//     description: "Deploy the app to Vercel for hosting",
//     completed: true,
//   },
// ];

export default function Home() {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [isediting, setIsediting] = useState(false);
  const [currenttodo, setCurrenttodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    completed: false,
    createDate: new Date().toISOString(),
  });

  // CHECK IF ITEM ALREADY EXISTS
  const localStorageItems = (e: React.FormEvent<HTMLFormElement>) => {};

  // #Getting items from local storage and persisting them.
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved && saved !== "undefined") {
      setTodolist(JSON.parse(saved));
    }
  }, []);

  // Storing item into the local storage.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  const handleMarkasCompleted = (id: string) => {
    setTodolist((prevTodos) => {
      const todotoupdate = prevTodos.find((todo) => todo.id === id);
      if (todotoupdate) {
        const updatedtodo = {
          ...todotoupdate,
          completed: todotoupdate.completed ? false : true,
        };
        return [
          ...prevTodos.map((todo) => {
            return todo.id === updatedtodo.id ? updatedtodo : todo
          }),
        ];
      }
      return prevTodos
    });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">
        Welcome to My Todo App
      </h1>
      {/* input form */}
      <TodoForm
        setTodolist={setTodolist}
        isediting={isediting}
        currenttodo={currenttodo}
        setIsediting={setIsediting}
        setCurrenttodo={setCurrenttodo}
      />

      {/* display */}
      {todolist?.map((todo) => (
        <TodoComponent
          todo={todo}
          key={todo.id}
          currenttodo={currenttodo}
          isediting={isediting}
          setIsediting={setIsediting}
          setCurrenttodo={setCurrenttodo}
          setTodolist={setTodolist}
          handleMarkasCompleted={handleMarkasCompleted}
        />
      ))}
    </div>
  );
}
