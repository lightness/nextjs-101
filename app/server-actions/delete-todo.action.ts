'use server'

import { deleteTodo } from '@/lib/todos/todos.service';
import { revalidatePath } from 'next/cache';

export default async function deleteTodoAction(formData: FormData) {
  const id = formData.get('id') as string;

  await deleteTodo(Number(id));

  revalidatePath('/');
}