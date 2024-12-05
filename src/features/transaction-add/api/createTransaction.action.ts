'use server';

import { type Transaction } from 'entities/transaction';
import { prisma } from 'shared/lib/prisma';

import { auth } from '@/prisma/auth';

import { createTransactionValidation } from '../model/createTransaction.validation';

export async function createTransactionAction(
  data: Omit<Transaction, 'id' | 'date' | 'amount'> & { date: string; amount: string },
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Auth');
  }

  const userId = session.user.id ? parseInt(session.user.id, 10) : null;
  if (!userId) {
    throw new Error('Auth');
  }

  const parse = createTransactionValidation.parse(data);
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
