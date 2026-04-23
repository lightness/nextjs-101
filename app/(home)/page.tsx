import { db } from "../../lib/db";
import CreateTodo from "../components/CreateTodo";
import TodoItem from "../components/TodoItem";
import { Todo } from "../generated/prisma/client";

async function fetchTodoItems(): Promise<Todo[]> {
  return db.todo.findMany({ orderBy: { createdAt: "desc" } });
}

export default async function HomePage() {
  const todoItems = await fetchTodoItems();

  return (
    <div className="flex flex-col mx-auto min-w-100 gap-2">
      <CreateTodo />
      {todoItems &&
        todoItems.map((item) => <TodoItem key={item.id} {...item} />)}
    </div>
  );
}
