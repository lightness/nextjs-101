"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

export default function CreateTodo() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create todo");
      }
      setText("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto min-w-100 gap-2"
    >
      <textarea
        className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
        placeholder="Add a new TODO item..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end">
        <Button disabled={isLoading || !text.trim()}>
          {isLoading ? "Adding..." : "➕ Add"}
        </Button>
      </div>
    </form>
  );
}
