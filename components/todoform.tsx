import React from "react";
import { Todo, Todoschematype, TodoSchema } from "@/types";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { todo } from "node:test";

type TodoProps = {
  setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
  isediting: Boolean;
  setIsediting: React.Dispatch<React.SetStateAction<boolean>>;
  currenttodo: Todo;
  setCurrenttodo: React.Dispatch<React.SetStateAction<Todo>>;
};

const TodoForm = ({
  setTodolist,
  isediting,
  setIsediting,
  currenttodo,
  setCurrenttodo,
}: TodoProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    control,
  } = useForm<Todoschematype>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      id: uuidv4(),
      title: "",
      description: "",
      completed: false,
      createDate: new Date().toISOString(),
    },
  });

  useEffect(() => {
    reset(currenttodo);
  }, [currenttodo, reset]);

  const handleCancel = () => {
    setIsediting(false);
    setCurrenttodo({
      id: uuidv4(),
      title: "",
      description: "",
      completed: false,
      createDate: new Date().toISOString(),
    })
    reset()
  }

  const submitHandler = (data: Todoschematype) => {
    if (isediting) {
      // Update the Todo list
      setTodolist((prevTodos) =>
        prevTodos.map((todo) => {
          return todo.id === currenttodo.id ? { ...todo, ...data } : todo;
        })
      );
      // console.log(data)
      toast.success("Your todo is successfully updated!");
    } else {
      // Add item
      setTodolist((prev) => [
        ...prev,
        { ...data, id: uuidv4(), createDate: new Date().toISOString() },
      ]);
      toast.success("Your Todo has been added Successfully!");
    }
    setIsediting(false);
    setCurrenttodo({
      id: uuidv4(),
      title: "",
      description: "",
      completed: false,
      createDate: new Date().toISOString(),
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        {errors.title ? <div className="text-red-600">{errors.title.message}</div> : null}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Task Description
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea
              id="description"
              // {...register("description")}
              required
              rows={3}
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            ></textarea>
          )}
        />
        {errors.description ? <div className="text-red-600">{errors.description.message}</div> : null}
      </div>
      <button
        type="submit"
        disabled={isediting && !isValid}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer mb-[10px]"
      >
        {isediting ? "Update Todo" : "Add To List"}
      </button>


      {currenttodo.title || currenttodo.description ? (
        <button className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-100 transition-colors duration-300 cursor-pointer "
      onClick={handleCancel}
      // type="button"
      >
        Cancel
      </button>
      ): null}
      
    </form>
  );
};

export default TodoForm;
