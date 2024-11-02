import { prisma } from 'shared/lib/prisma';

export async function getUserTransactions(userId: number) {
  try {
    return await prisma.transaction.findMany({
      where: { userId },
    });
  } catch {
    throw new Error('Серверная ошибка');
  }
}
