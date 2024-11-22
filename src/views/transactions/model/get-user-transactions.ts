import { prisma } from 'shared/lib/prisma';

export async function getUserTransactions(userId: number, page: number, perPage: number, searchQuery: string = '') {
  const skip = (page - 1) * perPage;
  const searchQueryLower = searchQuery.toLowerCase();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        titleSearch: {
          contains: searchQueryLower,
          mode: 'insensitive',
        },
      },
      orderBy: { date: 'desc' },
      skip,
      take: perPage,
    });

    const totalTransactions = await prisma.transaction.count({
      where: {
        userId,
        titleSearch: {
          contains: searchQueryLower,
          mode: 'insensitive',
        },
      },
    });

    return { transactions, totalTransactions };
  } catch {
    throw new Error('Серверная ошибка');
  }
}
