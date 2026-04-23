import deleteTodo from "../server-actions/delete-todo.action";
import finishTodo from "../server-actions/finish-todo.action";
import LinkButton from "./LinkButton";

export default function TodoItem({
  id,
  text,
  createdAt,
  completedAt,
}: {
  id: number;
  text: string;
  createdAt: Date;
  completedAt: Date | null;
}) {
  return (
    <div className={`p-4 border rounded shadow-sm bg-white dark:bg-gray-800`}>
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <h3
            className={`text-lg font-semibold text-black dark:text-white ${
              completedAt !== null ? "line-through" : ""
            }`}
          >
            {text}
          </h3>
          <p className="text-sm text-gray-900 dark:text-white">ID: {id}</p>
        </div>
        {!completedAt && (
          <form action={finishTodo}>
            <input type="hidden" name="id" value={id} />
            <LinkButton type="submit">Finish</LinkButton>
          </form>
        )}
        {completedAt && (
          <form action={deleteTodo}>
            <input type="hidden" name="id" value={id} />
            <LinkButton type="submit">Delete</LinkButton>
          </form>
        )}
      </div>
    </div>
  );
}
