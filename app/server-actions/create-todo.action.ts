'use server'

import { createTodo } from '@/lib/todos/todos.service';
import { revalidatePath } from 'next/cache';

type ActionState = { error: string | null };

export default async function createTodoAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const text = formData.get('text') as string;

  if (!text.trim()) {
    return { error: 'Todo text cannot be empty' };
  }

  await createTodo({ text });

  revalidatePath('/');

  return { error: null }
}