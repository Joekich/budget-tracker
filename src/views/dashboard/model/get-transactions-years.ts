'use server';

import { prisma } from 'shared/lib/prisma';

export async function getTransactionYears(userId: number): Promise<string[]> {
  try {
    const years = await prisma.transaction.findMany({
      where: { userId },
      select: { date: true },
    });

    const uniqueYears = Array.from(
      new Set(years.map((transaction) => new Date(transaction.date).getFullYear().toString())),
    );

    return uniqueYears.sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  } catch (error) {
    console.error('Ошибка при получении годов транзакций:', error);
    throw new Error('Не удалось получить года транзакций');
  }
}
