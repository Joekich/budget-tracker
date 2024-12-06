'use server';

import { type Transaction } from '@prisma/client';
import { transactionSchema } from 'entities/transaction';
import { prisma } from 'shared/lib/prisma';

import { auth } from '@/prisma/auth';

export async function EditTransactionAction(
  props: Omit<Transaction, 'date' | 'amount' | 'userId' | 'titleSearch'> & { date: string; amount: string },
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Вы не авторизованы');
  }

  const userId = session.user.id ? parseInt(session.user.id, 10) : null;
  if (!userId) {
    throw new Error('Не удалось определить пользователя');
  }

  const { id, title, amount, date, category, type } = transactionSchema.parse(props);

  try {
    await prisma.transaction.update({
      where: { id },
      data: {
        title,
        titleSearch: title.toLowerCase().trim(),
        amount: parseFloat(amount.toString()),
        date: new Date(date),
        category,
        type,
      },
    });
  } catch (error) {
    console.error('Ошибка при обновлении транзакции:', error);
    throw new Error('Не удалось обновить транзакцию');
  }
}
