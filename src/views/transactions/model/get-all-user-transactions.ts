import { prisma } from 'shared/lib/prisma';

export async function getAllUserTransactions(userId: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      orderBy: { date: 'desc' },
    });

    return transactions;
  } catch (error) {
    console.error('Ошибка при получении транзакций:', error);
    throw new Error('Не удалось получить транзакции');
  }
}
