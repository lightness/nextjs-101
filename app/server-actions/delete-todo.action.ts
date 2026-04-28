'use server'

import { revalidatePath } from 'next/cache';
import { deleteTodo } from '../../lib/todos/todos.service';

export default async function deleteTodoAction(formData: FormData) {
  const id = formData.get('id') as string;

  await deleteTodo(Number(id));

  revalidatePath('/');
}