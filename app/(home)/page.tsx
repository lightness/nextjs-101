import { getTodos } from "../../lib/todos/todos.service";
import CreateTodo from "../components/CreateTodo";
import TodoItem from "../components/TodoItem";

export default async function HomePage() {
  const todoItems = await getTodos();

  return (
    <div className="flex flex-col mx-auto min-w-100 gap-2">
      <CreateTodo />
      {todoItems &&
        todoItems.map((item) => <TodoItem key={item.id} {...item} />)}
    </div>
  );
}
