import { db } from '../db';
import { Todo } from '../generated/prisma/client';
import { ICreateTodo, ITodoSearchParams, IUpdateTodo } from './interfaces';

export async function getTodos(searchParams: ITodoSearchParams): Promise<Todo[]> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  return db.todo.findMany({ 
    where: {
      completedAt: searchParams.includeCompleted ? undefined : null,
      text: searchParams.term ? { contains: searchParams.term } : undefined,
    },
    orderBy: { createdAt: "desc" } 
  });
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