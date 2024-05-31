import React from "react";
import { TodoForm } from "../_components/todoForm";

function CreateTodoPage() {
  return (
    <div className="bg-white rounded-md min-w-[350px] px-4 py-6 flex flex-col gap-6">
      <h1 className="text-2xl text-neutral-700">Create a Todo here:</h1>
      <TodoForm />
    </div>
  );
}

export default CreateTodoPage;
