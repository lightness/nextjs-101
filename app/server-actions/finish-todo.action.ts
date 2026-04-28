'use server'

import { finishTodo } from '@/lib/todos/todos.service';
import { revalidatePath } from 'next/cache';

export default async function finishTodoAction(formData: FormData) {
  const id = formData.get('id') as string;

  await finishTodo(Number(id));

  revalidatePath('/');
}