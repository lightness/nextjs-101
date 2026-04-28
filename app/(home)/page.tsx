import CreateTodo from "@/app/components/CreateTodo";
import SearchBar from "@/app/components/SearchBar";
import TodoItem from "@/app/components/TodoItem";
import { getTodos } from "@/lib/todos/todos.service";

interface IHomePageSearchParams {
  includeCompleted?: string;
  term?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: IHomePageSearchParams;
}) {
  const params = await searchParams;
  const includeCompleted = params.includeCompleted === "true";
  const term = params.term || "";

  const todoItems = await getTodos({ term, includeCompleted });

  return (
    <div className="flex flex-col mx-auto min-w-100 gap-2">
      <CreateTodo />

      <SearchBar includeCompleted={includeCompleted} term={term} />

      {todoItems.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </div>
  );
}
