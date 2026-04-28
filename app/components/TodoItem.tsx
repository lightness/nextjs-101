import deleteTodoAction from "../server-actions/delete-todo.action";
import finishTodoAction from "../server-actions/finish-todo.action";
import LinkButton from "./LinkButton";

interface IProps {
  id: number;
  text: string;
  createdAt: Date;
  completedAt: Date | null;
}

export default function TodoItem({ id, text, completedAt }: IProps) {
  return (
    <div className={`p-4 border rounded shadow-sm bg-white dark:bg-gray-800`}>
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            {completedAt !== null && "✅"}
            <h3
              className={`text-lg font-semibold text-black dark:text-white ${
                completedAt !== null ? "line-through" : ""
              }`}
            >
              {text}
            </h3>
          </div>

          <p className="text-sm text-gray-900 dark:text-white">ID: {id}</p>
        </div>
        {!completedAt && (
          <form action={finishTodoAction}>
            <input type="hidden" name="id" value={id} />
            <LinkButton type="submit">Finish</LinkButton>
          </form>
        )}
        {completedAt && (
          <form action={deleteTodoAction}>
            <input type="hidden" name="id" value={id} />
            <LinkButton type="submit">Delete</LinkButton>
          </form>
        )}
      </div>
    </div>
  );
}
