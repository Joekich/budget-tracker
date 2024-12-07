import { prisma } from 'shared/lib/prisma';

export async function getLastYearTransactions(userId: number) {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1);
  const endDate = new Date(now.getFullYear() + 1, 0, 1);

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
    console.error('Ошибка при получении транзакций за последний месяц:', error);
    throw new Error('Не удалось получить транзакции за последний месяц');
  }
}
