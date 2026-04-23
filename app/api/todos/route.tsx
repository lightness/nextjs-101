import { db } from "../../../lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const text = (body as { text: string }).text?.trim();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const todo = await db.todo.create({ data: { text } });

  return Response.json(todo, { status: 201 });
}
