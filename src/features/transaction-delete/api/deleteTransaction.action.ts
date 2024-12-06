'use server';

import { prisma } from 'shared/lib/prisma';

import { auth } from '@/prisma/auth';

export async function deleteTransactionAction(transactionId: number) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Вы не авторизованы');
  }

  const userId = session.user.id ? parseInt(session.user.id, 10) : null;
  if (!userId) {
    throw new Error('Не удалось определить пользователя');
  }

  try {
    await prisma.transaction.deleteMany({
      where: {
        id: transactionId,
        userId,
      },
    });
  } catch (error) {
    console.error('Ошибка при удалении транзакции:', error);
    throw new Error('Не удалось удалить транзакцию');
  }
}
