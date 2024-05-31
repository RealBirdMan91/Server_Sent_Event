import { getTodos } from "@/lib/queries";
import Todos from "./_components/todos";

export default async function TodosPage() {
  const todos = await getTodos();
  return (
    <>
      <h1 className="text-2xl text-slate-800">Todos:</h1>
      <Todos initialTodos={todos} />
    </>
  );
}
