import { db } from '../db';
import { Todo } from '../generated/prisma/client';
import { ICreateTodo, IUpdateTodo } from './interfaces';

export async function getTodos(): Promise<Todo[]> {
  return db.todo.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createTodo({ text }: ICreateTodo): Promise<Todo> {
  const todo = await db.todo.create({ data: { text } });

  return todo;
}

export async function updateTodo({ id, ...fields }: IUpdateTodo): Promise<Todo> {
  const todo = await db.todo.update({
    where: { id },
    data: { ...fields },
  });

  return todo;
}

export async function finishTodo(id: number): Promise<Todo> {
  return updateTodo({ id, completedAt: new Date() });
}

export async function deleteTodo(id: number): Promise<Todo> {
  const todo = await db.todo.delete({ where: { id } });

  return todo;
}