import { db } from '../db';
import { Todo } from '../generated/prisma/client';

export async function createTodo({ text }: ICreateTodo
): Promise<Todo> {
  const todo = await db.todo.create({ data: { text } });

  return todo;
}
export async function updateTodo({ id, text, completed }: IUpdateTodo): Promise<Todo> {
  const todo = await db.todo.update({
    where: { id },
    data: { text, completed },
  });

  return todo;
}

export async function deleteTodo(id: number): Promise<Todo> {
  const todo = await db.todo.delete({ where: { id } });

  return todo;
}