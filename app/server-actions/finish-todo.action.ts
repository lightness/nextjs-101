'use server'

import { revalidatePath } from 'next/cache';
import { finishTodo } from '../../lib/todos/todos.service';

export default async function finishTodoAction(formData: FormData) {
  const id = formData.get('id') as string;

  await finishTodo(Number(id));

  revalidatePath('/');
}