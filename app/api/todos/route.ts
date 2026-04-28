import { createTodo, getTodos } from "@/lib/todos/todos.service";

export async function POST(req: Request) {
  const body = await req.json();
  const text = (body as { text: string }).text?.trim();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const todo = await createTodo({ text });

  return Response.json(todo, { status: 201 });
}

export async function GET() {
  const todos = await getTodos({});

  return Response.json(todos);
}