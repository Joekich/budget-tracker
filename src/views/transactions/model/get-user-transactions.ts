import { type Transaction } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';

type Filters = {
  type?: Transaction['type'] | null;
  categories?: string[];
  amountRange?: { min: number | null; max: number | null };
  dateRange?: { start: Date | null; end: Date | null };
};

export async function getUserTransactions(
  userId: number,
  page: number,
  perPage: number,
  searchQuery: string = '',
  filters: Filters = {},
) {
  const skip = (page - 1) * perPage;
  const searchQueryLower = searchQuery.toLowerCase();

  const where = {
    userId,
    titleSearch: {
      contains: searchQueryLower,
      mode: 'insensitive' as const,
    },
    ...(filters.type && { type: filters.type }),
    ...(filters.categories?.length && { category: { in: filters.categories } }),
    ...(filters.amountRange && {
      amount: {
        gte: filters.amountRange.min ?? undefined,
        lte: filters.amountRange.max ?? undefined,
      },
    }),
    ...(filters.dateRange && {
      date: {
        gte: filters.dateRange.start ?? undefined,
        lte: filters.dateRange.end ?? undefined,
      },
    }),
  };

  try {
    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      skip,
      take: perPage,
    });

    const totalTransactions = await prisma.transaction.count({
      where,
    });

    return { transactions, totalTransactions };
  } catch {
    throw new Error('Серверная ошибка');
  }
}
