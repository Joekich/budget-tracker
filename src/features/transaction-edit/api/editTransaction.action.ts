'use server';

import { type TransactionType } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';

import { auth } from '@/prisma/auth';

type EditTransactionProps = {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionType;
};

export async function EditTransactionAction({ id, title, amount, date, category, type }: EditTransactionProps) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Вы не авторизованы');
  }

  const userId = session.user.id ? parseInt(session.user.id, 10) : null;
  if (!userId) {
    throw new Error('Не удалось определить пользователя');
  }

  if (!id || !title || Number.isNaN(amount) || !date || !category || !type) {
    throw new Error('Некорректные данные');
  }

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
