"use client";

import { useActionState } from "react";
import createTodoAction from "../server-actions/create-todo.action";
import Button from "./Button";

const initialState = { error: null };

export default function CreateTodo() {
  const [state, formAction, pending] = useActionState(
    createTodoAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col mx-auto min-w-100 gap-2">
      <textarea
        className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
        placeholder="Add a new TODO item..."
        name="text"
        required
      />
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Adding..." : "➕ Add"}
        </Button>
      </div>
    </form>
  );
}
