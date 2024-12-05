import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { getPath } from 'shared/routing/paths';

import { auth } from '@/prisma/auth';

export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return new Response('Вы не авторизованы', { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return new Response('Некорректные данные', { status: 400 });
  }

  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id, 10) },
    });

    revalidatePath(getPath('transactions'), 'page');

    return new Response('Транзакция успешно удалена', { status: 200 });
  } catch (error) {
    console.error('Ошибка при удалении транзакции:', error);
    return new Response('Не удалось удалить транзакцию', { status: 500 });
  }
}
