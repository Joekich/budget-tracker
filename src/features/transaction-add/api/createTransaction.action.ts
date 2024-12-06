'use server';

import { type Transaction } from '@prisma/client';
import { transactionSchema } from 'entities/transaction';
import { prisma } from 'shared/lib/prisma';

import { auth } from '@/prisma/auth';

export async function createTransactionAction(
  data: Omit<Transaction, 'id' | 'date' | 'amount' | 'userId' | 'titleSearch'> & { date: string; amount: string },
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Auth');
  }

  const userId = session.user.id ? parseInt(session.user.id, 10) : null;
  if (!userId) {
    throw new Error('Auth');
  }

  const parse = transactionSchema.parse({ ...data, id: 0 });
  const { title, amount, date, category, type } = parse;
  const titleSearch = title.toLowerCase().trim();

  try {
    await prisma.transaction.create({
      data: {
        title,
        titleSearch,
        amount,
        date: new Date(date),
        category,
        type,
        userId,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error('Не получилось добавить транзакцию');
  }
}
