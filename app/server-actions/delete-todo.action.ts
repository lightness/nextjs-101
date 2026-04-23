'use server'

import { revalidatePath } from 'next/cache';
import { db } from '../../lib/db';

export default async function deleteTodo(formData: FormData) {
  const id = formData.get('id') as string;

  await db.todo.delete({
    where: { id: parseInt(id) },
  });

  revalidatePath('/');
}