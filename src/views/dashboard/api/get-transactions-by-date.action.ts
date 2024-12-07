'use server';

import { prisma } from 'shared/lib/prisma';

export async function getTransactionsByDate(userId: number, year: string, month: string) {
  const startDate = new Date(parseInt(year, 10), month === 'all' ? 0 : parseInt(month, 10) - 1, 1);
  const endDate =
    month === 'all' ? new Date(parseInt(year, 10) + 1, 0, 1) : new Date(parseInt(year, 10), parseInt(month, 10), 1);

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: { date: 'desc' },
    });

    return transactions;
  } catch (error) {
    console.error('Ошибка при получении транзакций за дату:', error);
    throw new Error('Не удалось получить транзакции');
  }
}
