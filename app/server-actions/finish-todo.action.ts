'use server'

import { revalidatePath } from 'next/cache';
import { db } from '../../lib/db';

export default async function finishTodo(formData: FormData) {
  const id = formData.get('id') as string;

  await db.todo.update({
    where: { id: parseInt(id) },
    data: { completedAt: new Date() },
  });

  revalidatePath('/');
}